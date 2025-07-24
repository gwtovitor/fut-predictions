import { Collection, MongoClient } from 'mongodb';
import Account from '../../../domain/entities/Account';
import IAccountRepository from './AccountRepository';
import UUID from '../../../domain/value-objects/UUID.vo';
import Password from '../../../domain/value-objects/Password.vo';

type AccountDocument = {
	_id: string; // UUID
	email: string;
	name: string;
	password: string;
};

export default class AccountRepositoryMongo implements IAccountRepository {
	private collection: Collection<AccountDocument>;

	constructor(client: MongoClient) {
		this.collection = client.db('GwtDb').collection<AccountDocument>('accounts');
		this.collection
			.createIndex({ email: 1 }, { unique: true })
			.catch(() => {});
	}
	async getAccountByEmail(email: string): Promise<Account | undefined> {
		const doc = await this.collection.findOne({ email });
		if (!doc) return undefined;
		return Account.build(doc._id, doc.email, doc.name, doc.password);
	}
	async saveAccount(account: Account): Promise<void> {
		await this.collection.insertOne({
			_id: account.id.toString(),
			email: account.email,
			name: account.name,
			password: account.password.valueAsString,
		});
	}

	async getAccount(accountId: string): Promise<Account | undefined> {
		const doc = await this.collection.findOne({ _id: accountId });
		if (!doc) return undefined;
		return new Account(
			UUID.build(doc._id),
			doc.email,
			doc.name,
			Password.build(doc.password)
		);
	}
}
