
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
    
    if (!user){
      return {
        access_token: '',
        role: '',
        success:false,
        staff: undefined,
      };
    }

    const token = await this.authService.login(user);
    const staff = await this.staffService.findOne(user.id);
    
    return {
      access_token: token.access_token,
      role: staff?.role?.name || '',
      success: true,
      staff: staff || undefined,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Staff])
  findAll() {
    return this.staffService.findAll();
  }
}
