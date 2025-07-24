export default function AIPrompt(home: string, away: string, date: string) {
	return `
Você é um especialista em análise esportiva.

Com base em dados de desempenho, retrospecto, elenco, mando de campo, estatísticas recentes, lesões, suspensões e qualquer informação relevante, faça uma análise detalhada do confronto entre "${home}" e "${away}" pelo Campeonato Brasileiro, marcado para o dia ${date}.

Sua resposta deve ser **exclusivamente** um JSON no formato abaixo, sem qualquer texto antes ou depois, sem títulos, sem blocos de código e sem comentários.

Responda **apenas** com o JSON, exatamente nesse formato:

{
  "date": "${date}",
  "home": "${home}",
  "away": "${away}",
  "analyses": {
    "winPercentageHome": <probabilidade numérica de vitória do mandante, de 0 a 100>,
    "winPercentageAway": <probabilidade numérica de vitória do visitante, de 0 a 100>,
    "drawPercentage": <probabilidade numérica de empate, de 0 a 100>,
    "reasonHome": "<Justificativa detalhada para possível vitória do ${home}.>",
    "reasonAway": "<Justificativa detalhada para possível vitória do ${away}.>",
    "reasonDraw": "<Justificativa detalhada para o empate.>",
    "mainInfluences": [
      {
        "type": "<Tipo do fator, como 'mando_de_campo', 'desfalque', 'forma_recente', 'retrospecto_direto', etc.>",
        "team": "<'home' para ${home}, 'away' para ${away} ou 'ambos'>",
        "description": "<Descrição detalhada sobre como esse fator impacta o jogo.>"
      }
      // Adicione quantos fatores forem relevantes
    ],
    "curiosity": "<Traga uma curiosidade interessante e inédita sobre este confronto.>"
  }
}

NÃO escreva absolutamente nada além do JSON, nem mesmo explicações ou saudações.
	`.trim();
}
