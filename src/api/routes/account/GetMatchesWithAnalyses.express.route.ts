import { HttpMethod, Route } from '../route';
import { Request, Response } from 'express';
import { UseCase } from '../../../use-cases/UseCase';
import {
	GetMatchesWithAnalysisInputDTO,
	GetMatchesWithAnalysisOutputDTO,
} from '../../../use-cases/GetmatchesWithAnalyses';
import { OutputAiService } from '../../../services/servicesTypes/IAiService'; // <-- importe do seu tipo AI
import { TTeam } from '../../../domain/entities/Team';

export type MatchWithAnalysisOutputDTO = {
	date: string;
	homeTeam: TTeam;
	awayTeam: TTeam;
	analysis: OutputAiService;
};

export type GetMatchesWithAnalysisResponseDTO = {
	matches: MatchWithAnalysisOutputDTO[];
};

export class GetMatchesWithAnalysisRoute implements Route {
	private constructor(
		private readonly path: string,
		private readonly method: HttpMethod,
		private readonly getMatchesWithAnalysisUseCase: UseCase<
			GetMatchesWithAnalysisInputDTO,
			GetMatchesWithAnalysisOutputDTO
		>
	) {}

	public getHandler() {
		return async (request: Request, response: Response) => {
			const { date } = request.params;
			const input: GetMatchesWithAnalysisInputDTO = { date };
			const output: GetMatchesWithAnalysisOutputDTO =
				await this.getMatchesWithAnalysisUseCase.execute(input);

			const responseBody = this.present(output);

			response.status(200).json(responseBody);
		};
	}

	private present(
		input: GetMatchesWithAnalysisOutputDTO
	): GetMatchesWithAnalysisResponseDTO {
		return {
			matches: input.matches.map(({ match, analysis }) => ({
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
				analysis: analysis,
			})),
		};
	}

	public static create(
		getMatchesWithAnalysisUseCase: UseCase<
			GetMatchesWithAnalysisInputDTO,
			GetMatchesWithAnalysisOutputDTO
		>
	) {
		return new GetMatchesWithAnalysisRoute(
			'/getMatchesWithAnalysis/:date',
			HttpMethod.GET,
			getMatchesWithAnalysisUseCase
		);
	}

	public getMethod(): HttpMethod {
		return this.method;
	}

	public getPath(): string {
		return this.path;
	}
}
