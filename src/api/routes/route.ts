export type HttpMethod = 'get' | 'post';
import { Request, Response } from "express";
// substiti o enum
export const HttpMethod = {
	GET: 'get' as HttpMethod,
	POST: 'post' as HttpMethod,
} as const;

export interface Route {
	getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath():string;
    getMethod(): HttpMethod;
}
