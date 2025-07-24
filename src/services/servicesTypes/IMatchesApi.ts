import { Match } from "../../domain/entities/Match";
import { TTeam } from "../../domain/entities/Team";

export default interface IMatchesApi {
	getTodayMatches(date: string): Promise<OutputGetMatchesDTO>;
}

export type OutputGetMatchesDTO = {
    matches: [
        {
            date: string,
            home: TTeam
            away: TTeam
        }
    ]
}