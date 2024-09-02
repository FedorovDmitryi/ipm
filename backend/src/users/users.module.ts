import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PasswordService } from 'src/auth/password.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,PasswordService],
  exports: [UsersService, PasswordService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UsersModule {}
