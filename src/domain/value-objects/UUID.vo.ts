import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export default class UUID {
    private readonly value: string;

    private constructor(uuid: string) {
        if (!uuidValidate(uuid)) {
            throw new Error('UUID must be a valid UUID (RFC4122)');
        }
        this.value = uuid;
    }

    static create(): UUID {
        return new UUID(uuidv4());
    }

    static build(uuid: string): UUID {
        return new UUID(uuid);
    }

    get(): string {
        return this.value;
    }

    // Sugestão extra: facilita usar em logs, comparação, etc.
    toString(): string {
        return this.value;
    }
}
