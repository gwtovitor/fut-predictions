import { GetMatches } from '../src/use-cases/GetMatches';
import IMatchesApi from '../src/services/servicesTypes/IMatchesApi';

test('Deve devolver uma lista de partidas - MOCK', async function () {
	const fakeMatches = [
		{
			date: "2025-07-24T20:00:00Z",
			home: {
				name: "Grêmio FBPA",
				shortName: "Grêmio",
				photo: "https://crests.football-data.org/1767.png"
			},
			away: {
				name: "Botafogo FR",
				shortName: "Botafogo",
				photo: "https://crests.football-data.org/1770.png"
			}
		},
		{
			date: "2025-07-24T22:00:00Z",
			home: {
				name: "EC Juventude",
				shortName: "Juventude",
				photo: "https://crests.football-data.org/4245_large.png"
			},
			away: {
				name: "São Paulo FC",
				shortName: "São Paulo",
				photo: "https://crests.football-data.org/1776.png"
			}
		}
	];

	const mockService: IMatchesApi = {
		getTodayMatches: jest.fn().mockResolvedValue({ matches: fakeMatches })
	};

	const useCase = new GetMatches(mockService);

	const input = { date: "2025-07-24" };

	const output = await useCase.execute(input);

	expect(output.matches).toHaveLength(2);
	expect(output.matches[0].home.name).toBe("Grêmio FBPA");
	expect(mockService.getTodayMatches).toHaveBeenCalledTimes(1);
	expect(mockService.getTodayMatches).toHaveBeenCalledWith("2025-07-24");
});
