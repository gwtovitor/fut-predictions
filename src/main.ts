import dotenv from 'dotenv';
dotenv.config();
import { ApiExpress } from './api/express.api';
import AccountRepositoryMongo from './infra/repository/Account/AccountRepository.mongo';
import JWTTokenGenerator from './services/JWTTokenGenerator.service';
import { getMongoClient } from './infra/db/mongo/mongoClient';
import { setupAccountRoutes } from './setupAccountRoutes';
import FootballDataMatchApi from './services/FootballData.service';
import { GetMatches } from './use-cases/GetMatches';
import { GetmatchesRoute } from './api/routes/account/GetMatchesRoute.express.route';
import { GetMatchesWithAnalysis } from './use-cases/GetmatchesWithAnalyses';
import { GeminiAiService } from './services/GeminiAI.service';
import { GetMatchesWithAnalysisRoute } from './api/routes/account/GetMatchesWithAnalyses.express.route';

async function main() {
	const client = await getMongoClient();
	const aRepository = new AccountRepositoryMongo(client);
	const tokenGenerator = new JWTTokenGenerator(
		process.env.JWT_SECRET as string
	);

	const getMatchesService = new FootballDataMatchApi();

	const getMatches = new GetMatches(getMatchesService);
	const getMatchesRoute = GetmatchesRoute.create(getMatches);

	const aiService = new GeminiAiService();
	const getMatchesWhitAnalyses = new GetMatchesWithAnalysis(
		getMatchesService,
		aiService
	);
	const getMatchesWhitAnalysesRoute = GetMatchesWithAnalysisRoute.create(
		getMatchesWhitAnalyses
	);
	const routes = setupAccountRoutes({
		aRepository,
		tokenGenerator,
	});

	const port = 8000;
	const api = ApiExpress.create([
		...routes,
		getMatchesRoute,
		getMatchesWhitAnalysesRoute,
	]);
	api.start(port);
}

main();
