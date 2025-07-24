import axios from 'axios';
import IMatchesApi, { OutputGetMatchesDTO } from './servicesTypes/IMatchesApi';
import { TTeam } from '../domain/entities/Team';

export default class FootballDataMatchApi implements IMatchesApi {
	
	async getTodayMatches(date: string): Promise<OutputGetMatchesDTO> {
		const url = `https://api.football-data.org/v4/competitions/BSA/matches?dateFrom=${date}&dateTo=${date}&status=SCHEDULED`;
		const token = process.env.FOOTBALL_DATA_API;
		const response = await axios.get(url, {
			headers: { 'X-Auth-Token': token },
		});
		const matches = response.data.matches.map((match: any) => ({
			date: match.utcDate,
			home: {
				name: match.homeTeam.name,
				shortName: match.homeTeam.shortName,
				photo: match.homeTeam.crest,
			} as TTeam,
			away: {
				name: match.awayTeam.name,
				shortName: match.awayTeam.shortName,
				photo: match.awayTeam.crest,
			} as TTeam,
		}));

		return { matches };
	}
}
