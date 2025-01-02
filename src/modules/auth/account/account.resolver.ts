import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from '@/src/modules/auth/account/inputs/create-user.input';
import { UserModel } from '@/src/modules/auth/account/model/user.model';

import { AccountService } from './account.service';

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Query(() => [UserModel], { name: 'findAllUsers' })
	async findAll() {
		return this.accountService.findAll();
	}

	@Mutation(() => Boolean, { name: 'createUser' })
	async create(@Args('data') input: CreateUserInput) {
		return this.accountService.create(input);
	}
}
