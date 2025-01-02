import { Query, Resolver } from '@nestjs/graphql';

import { UserModel } from '@/src/modules/auth/account/model/user.model';

import { AccountService } from './account.service';

@Resolver('Account')
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Query(() => [UserModel], { name: 'findAllUsers' })
	async findAll() {
		return this.accountService.findAll();
	}
}
