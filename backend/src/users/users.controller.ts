import { Body, Controller, Get, Post, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { Request } from 'express';
import { Public } from 'src/auth/decorator';
import { User } from './user.entity';
import { CustomResponse } from 'src/interface/CustomResponse';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService){}


    @Get()
    getAll(): Promise<User[]>{
        return this.usersService.getAllUsers();
    }

    @Get('username')
    getUsername(@Req() req: Request){
        const {username} = req.user as any;
        return {username};
    }

    @Public()
    @Post()
    create(@Body() userDto: CreateUserDto): Promise<CustomResponse>{
        return this.usersService.createUser(userDto);
    }


    // @Get('test')
    // test(@Req() req: Request){
    //     const {username} = req.user as any;
    //     return {username};
    // }
}
