import Account from "../../../domain/entities/Account";

export default interface IAccountRepository {
	saveAccount(account: Account): Promise<void>;
	getAccount(accountId: string): Promise<Account | undefined>;
	getAccountByEmail(email: string): Promise<Account | undefined>;
}
