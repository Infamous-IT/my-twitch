import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';

import { PrismaService } from '@/src/core/prisma/prisma.service';
import { CreateUserInput } from '@/src/modules/auth/account/inputs/create-user.input';

@Injectable()
export class AccountService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll() {
		const users = await this.prismaService.user.findMany();
		return users;
	}

	async create(input: CreateUserInput) {
		const { username, email, password } = input;

		const isUsernameExists = await this.prismaService.user.findUnique({
			where: {
				username,
			},
		});

		if (isUsernameExists) {
			throw new ConflictException('This username already exists!');
		}

		const isEmailExists = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (isEmailExists) {
			throw new ConflictException('This email already exists!');
		}

		await this.prismaService.user.create({
			data: {
				username,
				email,
				password: await hash(password),
				displayName: username,
			},
		});

		return true;
	}
}
