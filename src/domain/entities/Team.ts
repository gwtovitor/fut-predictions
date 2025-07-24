export class Team {
	constructor(
		public readonly name: string,
		public readonly shortName: string,
		public readonly photo: string | null
	) {}

	static build(team: TTeam): Team {
		return new Team(team.name, team.shortName, team.photo);
	}
}

export type TTeam = {
	name: string;
	shortName: string;
	photo: string | null;
};
