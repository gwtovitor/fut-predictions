import dotenv from 'dotenv';
dotenv.config();

import CreateAccount from '../src/use-cases/CreateAccount';
import JWTTokenGenerator from '../src/services/JWTTokenGenerator.service';
test('Deve criar uma conta para o jogador - MOCK', async function () {
	// given
	const mockRepository = {
		saveAccount: jest.fn().mockResolvedValue(undefined),
		getAccount: jest.fn(),
		getAccountByEmail: jest.fn(),
	};
	const jwt = new JWTTokenGenerator(process.env.JWT_SECRET as string);
	const signup = new CreateAccount(mockRepository, jwt);

	const input = {
		name: 'John Doe',
		email: 'john.doe@gmail.com',
		password: 'Vitor1997@123',
	};

	//when
	const output = await signup.execute(input);

	//then
	expect(output.token).toBeDefined();
	expect(typeof output.token).toBe('string');
	const decoded = jwt.verify(output.token);
	expect(decoded).toBeDefined();
	expect(decoded).toHaveProperty('email', input.email);
	expect(decoded).toHaveProperty('name', input.name);

	expect(mockRepository.saveAccount).toHaveBeenCalledTimes(1);
});
test('Não Deve criar uma conta para o jogador Senha invalida - MOCK', async function () {
  // given
  const mockRepository = {
    saveAccount: jest.fn().mockResolvedValue(undefined),
    getAccount: jest.fn(),
    getAccountByEmail: jest.fn(),
  };
  const jwt = new JWTTokenGenerator(process.env.JWT_SECRET as string);
  const signup = new CreateAccount(mockRepository, jwt);

  const input = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: '23', // senha inválida (menor que 8)
  };

  // when & then
  await expect(signup.execute(input)).rejects.toThrow("Password must be at least 8 characters long.");

  expect(mockRepository.saveAccount).not.toHaveBeenCalled();
});