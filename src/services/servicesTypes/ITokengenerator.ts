export default interface ITokenGenerator {
  generate(payload: Payload): string;
  verify(token: string): object | null;
}

export type Payload = {
    name: string;
    email: string
}