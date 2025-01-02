import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/src/core/prisma/prisma.service';

@Injectable()
export class AccountService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll() {
		const users = await this.prismaService.user.findMany();
		return users;
	}
}
