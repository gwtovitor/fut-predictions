import dotenv from 'dotenv';
dotenv.config();
import LoginAccount from '../src/use-cases/LoginAccount';
import Account from '../src/domain/entities/Account';
import UUID from '../src/domain/value-objects/UUID.vo';
import Password from '../src/domain/value-objects/Password.vo';
import JWTTokenGenerator from '../src/services/JWTTokenGenerator.service';


beforeAll(() => {
  jest.spyOn(Password.prototype, 'compare').mockResolvedValue(true);
});

test('Deve logar uma conta para o jogador - MOCK', async function () {
	const input = {
		email: 'gwtovitorpw@gmail.com',
		password: 'Gwtovitorpw123',
	};
	const password = Password.build('any');
	const fakeAccount = new Account(
		UUID.build('6ce118d7-89c1-477c-b43a-de49641a3dc6'),
		input.email,
		'Vitor',
		password
	);
	const jwt = new JWTTokenGenerator(process.env.JWT_SECRET as string);
	const mockRepository = {
		saveAccount: jest.fn().mockResolvedValue(undefined),
		getAccount: jest.fn().mockResolvedValue(null),
		getAccountByEmail: jest.fn().mockResolvedValue(fakeAccount),
	};
	const login = new LoginAccount(mockRepository, jwt);

	const output = await login.execute(input);

	expect(output.token).toBeDefined();
	expect(typeof output.token).toBe('string');
	const decoded = jwt.verify(output.token);
	expect(decoded).toBeDefined();
	expect(decoded).toHaveProperty('email', input.email);

	expect(mockRepository.getAccountByEmail).toHaveBeenCalledTimes(1);
});
