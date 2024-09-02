import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class GetUsernameDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
