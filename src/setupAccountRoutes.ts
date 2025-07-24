import { LoginAccountRoute } from './api/routes/account/LoginAccountRoute.express.route';
import { SignupAccountRoute } from './api/routes/account/SignupAccountRoute.express.route';
import { Route } from './api/routes/route';
import IAccountRepository from './infra/repository/Account/AccountRepository';
import ITokenGenerator from './services/servicesTypes/ITokengenerator';
import CreateAccount from './use-cases/CreateAccount';
import LoginAccount from './use-cases/LoginAccount';

export function setupAccountRoutes({
	aRepository,
	tokenGenerator,
}: {
	aRepository: IAccountRepository;
	tokenGenerator: ITokenGenerator;
}): Route[] {
	const createAccount = new CreateAccount(aRepository, tokenGenerator);
	const loginAccount = new LoginAccount(aRepository, tokenGenerator);

	const createRoute = SignupAccountRoute.create(createAccount);
	const loginRoute = LoginAccountRoute.create(loginAccount);

	return [createRoute, loginRoute];
}
