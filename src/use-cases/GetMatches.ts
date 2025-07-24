import { Match } from '../domain/entities/Match';
import FootballDataMatchApi from '../services/FootballData.service';
import IMatchesApi from '../services/servicesTypes/IMatchesApi';
import { UseCase } from './UseCase';

export type GetMatchesInputDTO = {
	date: string;
};
export type GetMatchesOutputDTO = {
	matches: Match[];
};

export class GetMatches
	implements UseCase<GetMatchesInputDTO, GetMatchesOutputDTO>
{
	constructor(readonly getMatchesService: IMatchesApi) {}

	async execute(input: GetMatchesInputDTO): Promise<GetMatchesOutputDTO> {
		const response = await this.getMatchesService.getTodayMatches(
			input.date
		);
		const matches = response.matches.map((matchDto) =>
			Match.build(matchDto.date, matchDto.home, matchDto.away)
		);
		return { matches };
	}
}
