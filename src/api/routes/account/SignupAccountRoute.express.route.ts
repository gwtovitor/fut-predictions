// import { AccountInputDTO } from '../../../use-cases/CreateAccount';
import Signup, { CreateAccountOutputDTO } from '../../../use-cases/CreateAccount';
import { HttpMethod, Route } from '../route';
import { Request, Response } from 'express';
import { CreateAccountInputDTO } from '../../../use-cases/CreateAccount';
import { UseCase } from '../../../use-cases/UseCase';

export class SignupAccountRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly signupUsecase: UseCase<CreateAccountInputDTO, CreateAccountOutputDTO>
	) {}

	public getHandler() {
		return async (request: Request, response: Response) => {
			const { name, email, password } = request.body;
			const input: CreateAccountInputDTO = { name, email, password };

			const output: CreateAccountOutputDTO = await this.signupUsecase.execute(
				input
			);

			const responseBody = this.present(output);

			response.status(201).json(responseBody).send();
		};
	}

	private present(input: CreateAccountOutputDTO): CreateAccountOutputDTO {
		return input;
	}

	public static create(createProductService: Signup) {
		return new SignupAccountRoute(
			'/signup',
			HttpMethod.POST,
			createProductService
		);
	}

	public getMethod(): HttpMethod {
		return this.method;
	}

	public getPath(): string {
		return this.path;
	}
}
