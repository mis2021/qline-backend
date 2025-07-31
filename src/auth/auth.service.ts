import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(staffUser: string, staffPass: string) {
    const user = await this.prisma.staff.findUnique({
      where: { staffUser },
      include: {
        role: true,
        department: true, 
      },
    });

    if (user && (await bcrypt.compare(staffPass, user.staffPass))) {
      const { staffPass, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid username or password');
  }

  async login(user: any) {
    const payload = { 
      staffUser: user.staffUser,
      sub: user.id, 
      role: user.role.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}