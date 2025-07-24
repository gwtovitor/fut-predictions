import Password from '../value-objects/Password.vo';
import UUID from '../value-objects/UUID.vo';

export default class Account {
    constructor(
        readonly id: UUID,
        readonly email: string,
        readonly name: string,
        readonly password: Password
    ) {}

    static async create(email: string, name: string, pass: string) {
        const uuid = UUID.create();
        const password = await Password.create(pass); 
        return new Account(uuid, email, name, password);
    }

    static build(id: string, email: string, name: string, hash: string) {
        const password = Password.build(hash);
        return new Account(UUID.build(id), email, name, password);
    }
}
