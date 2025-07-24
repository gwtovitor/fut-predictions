import { Match } from '../domain/entities/Match';
import IMatchesApi from '../services/servicesTypes/IMatchesApi';
import {
	IAiService,
	OutputAiService,
} from '../services/servicesTypes/IAiService';
import { UseCase } from './UseCase';
import { TTeam } from '../domain/entities/Team';

export type GetMatchesWithAnalysisInputDTO = { date: string };
export type GetMatchesWithAnalysisOutputDTO = {
	matches: MatchWithAnalysisDTO[];
};

export type MatchWithAnalysisDTO = {
	match: Match;
	analysis: OutputAiService;
};

export type MatchWithAnalysisOutputDTO = {
	date: string;
	homeTeam: TTeam;
	awayTeam: TTeam;
	analysis: {
		status: string;
		dataJogo: string;
		timeCasa: string;
		timeVisitante: string;
		campeonato: string;
		analise: {
			winPercentageHome: number;
			winPercentageAway: number;
			drawPercentage: number;
			reasonHome: string;
			reasonAway: string;
			reasonDraw: string;
			mainInfluences: {
				type: string;
				team: string;
				description: string;
			}[];
			curiosity: string;
		};
	};
};

export type GetMatchesWithAnalysisResponseDTO = {
	matches: MatchWithAnalysisOutputDTO[];
};

export class GetMatchesWithAnalysis
	implements
		UseCase<
			GetMatchesWithAnalysisInputDTO,
			GetMatchesWithAnalysisOutputDTO
		>
{
	constructor(
		private readonly getMatchesService: IMatchesApi,
		private readonly aiService: IAiService
	) {}

	async execute(
		input: GetMatchesWithAnalysisInputDTO
	): Promise<GetMatchesWithAnalysisOutputDTO> {
		const response = await this.getMatchesService.getTodayMatches(
			input.date
		);
		const matchesWithAnalysis = await Promise.all(
			response.matches.map(async (matchDto) => {
				const match = Match.build(
					matchDto.date,
					matchDto.home,
					matchDto.away
				);
				const analysis = await this.aiService.getAnalysis(
					match.date,
					match.home.name,
					match.away.name
				);
				return { match, analysis };
			})
		);

		return { matches: matchesWithAnalysis };
	}
}
