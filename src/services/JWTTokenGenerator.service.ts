// infra/auth/JWTTokenGenerator.ts
import ITokenGenerator, { Payload } from './servicesTypes/ITokengenerator';
import jwt from 'jsonwebtoken';

export default class JWTTokenGenerator implements ITokenGenerator {
	constructor(private readonly secret: string) {}

	generate(payload: Payload): string {
		return jwt.sign(payload, this.secret, { expiresIn: '1d' });
	}

	verify(token: string): object | null {
		try {
			return jwt.verify(token, this.secret) as object;
		} catch {
			return null;
		}
	}
}
