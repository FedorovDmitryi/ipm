import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString} from "class-validator";
import { Match } from "src/decorators/match.decorators";
import { Role } from "src/roles/role.enum";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Match('password',{message: 'Пароли не совпали'})
    repeat_password: string;

    @IsArray()
    @ArrayNotEmpty()
    roles: Role[];
}
