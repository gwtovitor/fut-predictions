import { Api } from './api';
import express, { Express } from 'express';
import { Route } from './routes/route';

export class ApiExpress implements Api {
	private app: Express;

	private constructor(routes: Route[]) {
		this.app = express();
		this.app.use(express.json());
		this.addRoutes(routes);
	}

	public static create(routes: Route[]) {
		return new ApiExpress(routes);
	}

	private addRoutes(routes: Route[]) {

		routes.forEach((route) => {
			const path = route.getPath();
			const method = route.getMethod();
			const handler = route.getHandler();

			// equals this.app.get("/route", fn)
			this.app[method](path, handler);
		});
	}

	start(port: number): void {
		this.app.listen(port, () => {
			console.log(`Server runing on port ${port}`);
			this.listRoutes();
		});
	}

	private listRoutes() {
		const router = this.app.router;
		const routes = router.stack
			.filter((layer: any) => layer.route)
			.map((layer: any) => {
				return {
					path: layer.route.path,
					method: Object.keys(layer.route.methods)[0].toUpperCase(),
				};
			});
		console.log(routes);
	}
}
