import Account from '../domain/entities/Account';
import IAccountRepository from '../infra/repository/Account/AccountRepository';
import ITokenGenerator from '../services/servicesTypes/ITokengenerator';
import { UseCase } from './UseCase';

export default class LoginAccount implements UseCase<LoginAccountInputDTO, LoginAccountOutputDTO> {
	constructor(
		readonly accountRepository: IAccountRepository,
		readonly jwtGenerator: ITokenGenerator
	) {}

	async execute(input: LoginAccountInputDTO): Promise<LoginAccountOutputDTO> {
		const account = await this.accountRepository.getAccountByEmail(
			input.email
		);
		if (!account) throw new Error('Account not found');
		const isValid = await account.password.compare(input.password);
		if (!isValid) throw new Error('Invalid credentials');

		const jwt = this.jwtGenerator.generate({
			name: account.name,
			email: account.email,
		});
		return {
			token: jwt,
		};
	}
}

export type LoginAccountInputDTO = {
	email: string;
	password: string;
};

export type LoginAccountOutputDTO = {
	token: string;
};
