import Signup from '../../../use-cases/CreateAccount';
import { HttpMethod, Route } from '../route';
import { Request, Response } from 'express';
// import { CreateAccount } from '../../../use-cases/CreateAccount';
import {
	LoginAccountInputDTO,
	LoginAccountOutputDTO,
} from '../../../use-cases/LoginAccount';
import { UseCase } from '../../../use-cases/UseCase';
import {
	GetMatches,
	GetMatchesInputDTO,
	GetMatchesOutputDTO,
} from '../../../use-cases/GetMatches';
import { TTeam } from '../../../domain/entities/Team';

export class GetmatchesRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly getMatchUseCase: UseCase<
			GetMatchesInputDTO,
			GetMatchesOutputDTO
		>
	) {}

	public getHandler() {
		return async (request: Request, response: Response) => {
			const { date } = request.params;
			const input: GetMatchesInputDTO = { date };

			const output: GetMatchesOutputDTO =
				await this.getMatchUseCase.execute(input);

			const responseBody = this.present(output);

			response.status(201).json(responseBody).send();
		};
	}

	private present(input: GetMatchesOutputDTO): {
		matches: GetMatchOutputDTO[];
	} {
		return {
			matches: input.matches.map((match) => ({
				date: match.date,
				homeTeam: {
					name: match.home.name,
					shortName: match.home.shortName,
					photo: match.home.photo,
				},
				awayTeam: {
					name: match.away.name,
					shortName: match.away.shortName,
					photo: match.away.photo,
				},
			})),
		};
	}

	public static create(getMatchesService: GetMatches) {
		return new GetmatchesRoute(
			'/getMatches/:date',
			HttpMethod.GET,
			getMatchesService
		);
	}

	public getMethod(): HttpMethod {
		return this.method;
	}

	public getPath(): string {
		return this.path;
	}
}

export type GetMatchOutputDTO = {
	date: string;
	homeTeam: TTeam;
	awayTeam: TTeam;
};
