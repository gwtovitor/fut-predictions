import Account from '../domain/entities/Account';
import IAccountRepository from '../infra/repository/Account/AccountRepository';
import ITokenGenerator from '../services/servicesTypes/ITokengenerator';
import { UseCase } from './UseCase';

export type CreateAccountOutputDTO = {
	token: string;
};

export type CreateAccountInputDTO = {
	email: string;
	name: string;
	password: string;
};

export default class CreateAccount
	implements UseCase<CreateAccountInputDTO, CreateAccountOutputDTO>
{
	constructor(
		readonly accountRepository: IAccountRepository,
		readonly jwtGenerator: ITokenGenerator
	) {}

	async execute(
		input: CreateAccountInputDTO
	): Promise<CreateAccountOutputDTO> {
		const createAccount = await Account.create(
			input.email,
			input.name,
			input.password
		);
		await this.accountRepository.saveAccount(createAccount);

		const output = this.jwtGenerator.generate({
			name: input.name,
			email: input.email,
		});
		return {
			token: output,
		};
	}
}
