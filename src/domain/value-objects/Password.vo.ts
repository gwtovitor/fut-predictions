import bcrypt from 'bcrypt';

export default class Password {
	private constructor(private readonly value: string) {}

	private static validate(plain: string): void {
		if (!plain) throw new Error('Password must not be empty.');
		if (plain.length < 8)
			throw new Error('Password must be at least 8 characters long.');
		if (!/[A-Z]/.test(plain))
			throw new Error(
				'Password must contain at least one uppercase letter.'
			);
		if (!/[a-z]/.test(plain))
			throw new Error(
				'Password must contain at least one lowercase letter.'
			);
		if (!/\d/.test(plain))
			throw new Error('Password must contain at least one digit.');
		if (!/[@$!%*?&]/.test(plain))
			throw new Error(
				'Password must contain at least one special character (@$!%*?&).'
			);
	}

	public static async create(plain: string): Promise<Password> {
		this.validate(plain);
		const saltRounds = Number(process.env.SALT_ROUNDS || 10);
		const hash = await bcrypt.hash(plain, saltRounds);
		return new Password(hash);
	}

	public static build(hashed: string): Password {
		return new Password(hashed);
	}
	get valueAsString(): string {
		return this.value;
	}

	public async compare(plain: string): Promise<boolean> {
		return bcrypt.compare(plain, this.value);
	}

	public equals(other: Password): boolean {
		return this.value === other.value;
	}
}
