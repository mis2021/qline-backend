import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Staff } from 'src/staff/entities/staff.entity'; 
import { StaffService } from 'src/staff/staff.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private staffService: StaffService, 
  ) {}

  @Mutation(() => String)
  async login(
    @Args('staffUser') staffUser: string,
    @Args('staffPass') staffPass: string,
  ) {
    const user = await this.authService.validateUser(staffUser, staffPass);
    const token = await this.authService.login(user);
    return token.access_token;
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Staff])
  findAll() {
    return this.staffService.findAll();
  }
}
