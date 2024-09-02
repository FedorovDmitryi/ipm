import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/auth/password.service';
import { CustomResponse } from 'src/interface/CustomResponse';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>, 
                                        private PasswordService: PasswordService){}

    async getAllUsers(): Promise<User[]>{
        return this.usersRepository.find();
    }
    
    async createUser (dto: CreateUserDto): Promise<CustomResponse>{
        const { email, password, roles } = dto;
        const user = new User();
        user.email = email;
        user.password = await this.PasswordService.hashPassword(password);
        user.roles = roles;
        try {
            await this.usersRepository.save(user);
        } catch(error){
            throw new ConflictException();
        }
        return {status: 'success'};
    }

    async findOne(email: string): Promise<User> {
        const users = await this.usersRepository.find();
        return users.find(user => user.email === email);
      }
}
