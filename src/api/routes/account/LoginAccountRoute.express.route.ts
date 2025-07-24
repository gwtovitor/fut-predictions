import Signup from '../../../use-cases/CreateAccount';
import { HttpMethod, Route } from '../route';
import { Request, Response } from 'express';
// import { CreateAccount } from '../../../use-cases/CreateAccount';
import LoginAccount, { LoginAccountInputDTO, LoginAccountOutputDTO } from '../../../use-cases/LoginAccount';
import { UseCase } from '../../../use-cases/UseCase';

export class LoginAccountRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly loginUseCase: UseCase<LoginAccountInputDTO, LoginAccountOutputDTO>
	) {}

	public getHandler() {
		return async (request: Request, response: Response) => {
			const { email, password } = request.body;
			const input: LoginAccountInputDTO = { email, password };

			const output: LoginAccountOutputDTO = await this.loginUseCase.execute(
				input
			);

			const responseBody = this.present(output);

			response.status(201).json(responseBody).send();
		};
	}

	private present(input: LoginAccountOutputDTO): LoginAccountOutputDTO {
		return input;
	}

	public static create(loginService: LoginAccount) {
		return new LoginAccountRoute(
			'/login',
			HttpMethod.POST,
			loginService
		);
	}

	public getMethod(): HttpMethod {
		return this.method;
	}

	public getPath(): string {
		return this.path;
	}
}
