import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('staffUser') staffUser: string,
    @Args('staffPass') staffPass: string,
  ) {
    const user = await this.authService.validateUser(staffUser, staffPass);
    const token = await this.authService.login(user);
    return token.access_token;
  }
}
