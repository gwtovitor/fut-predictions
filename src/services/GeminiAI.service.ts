import { GoogleGenAI } from "@google/genai";
import { OutputAiService, IAiService } from './servicesTypes/IAiService';
import AIPrompt from './aiPrompt';

function extractJson(text: string): string {
	const codeBlockMatch = text.match(/```json\s*([\s\S]*?)```/i);
	if (codeBlockMatch) return codeBlockMatch[1];
	const firstCurly = text.indexOf('{');
	const lastCurly = text.lastIndexOf('}');
	if (firstCurly !== -1 && lastCurly !== -1) {
		return text.substring(firstCurly, lastCurly + 1);
	}
	throw new Error('Nenhum JSON encontrado na resposta!');
}

export class GeminiAiService implements IAiService {
	private readonly ai: GoogleGenAI;

	constructor() {
		this.ai = new GoogleGenAI({
			apiKey: process.env.GEMINI_API_KEY,
		});
	}

	async getAnalysis(
		date: string,
		home: string,
		away: string
	): Promise<OutputAiService> {
		const prompt = AIPrompt(home, away, date);

		const response = await this.ai.models.generateContent({
			model: "gemini-1.5-flash",
			contents: prompt,
		});
		const text = (response as any).text || (response as any).candidates?.[0]?.content?.parts?.[0]?.text;
		if (!text) throw new Error('Resposta inesperada do Gemini.');

		let parsed: OutputAiService;
		try {
			const jsonString = extractJson(text);
			parsed = JSON.parse(jsonString);
		} catch (e) {
			throw new Error('Erro ao converter resposta do Gemini: ' + e + `\nPrompt enviado: ${prompt}\nTexto recebido: ${text}`);
		}
		return parsed;
	}
}
