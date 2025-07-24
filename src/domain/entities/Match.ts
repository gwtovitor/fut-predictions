import { Team, TTeam } from "./Team";

export class Match {
	constructor(
		public readonly date: string,
		public readonly home: Team,
		public readonly away: Team
	) {}

	static build(date: string, home: TTeam, away: TTeam): Match {
		return new Match(date, Team.build(home), Team.build(away));
	}
}
