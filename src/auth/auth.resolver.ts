// auth.resolver.ts
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Staff } from 'src/staff/entities/staff.entity'; 
import { StaffService } from 'src/staff/staff.service';
import { Login } from './dto/login'; 

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private staffService: StaffService, 
  ) {}

  @Mutation(() => Login)
  async login(
    @Args('staffUser') staffUser: string,
    @Args('staffPass') staffPass: string,
  ): Promise<Login> {
    const user = await this.authService.validateUser(staffUser, staffPass);
    const token = await this.authService.login(user);

    return {
      access_token: token.access_token,
      role: user.role.name, 
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Staff])
  findAll() {
    return this.staffService.findAll();
  }
}
