import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { CustomResponse } from 'src/interface/CustomResponse';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private PasswordService: PasswordService
      ) {}

  async signInUser(email: string, pass: string): Promise<CustomResponse> {
    const user = await this.usersService.findOne(email);
    if (!this.PasswordService.comparePasswords(pass,user.password)) {
      throw new UnauthorizedException();
    }
    if (user.roles[0] === 'user'){
      const payload = { sub: user.id, username: user.email, roles: user.roles};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }else{
      throw new UnauthorizedException();
    }
  }

  async signInAdmin(email: string, pass: string): Promise<CustomResponse>{
    const user = await this.usersService.findOne(email);
    if (!this.PasswordService.comparePasswords(pass,user.password)) {
      throw new UnauthorizedException();
    }
    
    if (user.roles[0] === 'admin'){
      const payload = { sub: user.id, username: user.email, roles: user.roles};
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }else{
      throw new UnauthorizedException();
    }
  }
}