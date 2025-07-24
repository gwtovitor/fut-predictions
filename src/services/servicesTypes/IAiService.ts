export interface IAiService {
	getAnalysis(
		date: string,
		home: string,
		away: string,
	): Promise<OutputAiService>;
}

export type OutputAiService = {
	date: string;
	home: string;
	away: string;
	analyses: Analysis;
};

export type Analysis = {
	winPercentageHome: number;
	winPercentageAway: number;
	drawPercentage: number;
	reasonHome: string;
	reasonAway: string;
	reasonDraw: string;
	mainInfluences: MainInfluence[];
	curiosity: string;
};

export type MainInfluence = {
	type: string;
	team: 'home' | 'away' | 'ambos';
	description: string;
};
