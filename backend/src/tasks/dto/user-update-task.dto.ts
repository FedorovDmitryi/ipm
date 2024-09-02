import { IsNotEmpty, IsString } from "class-validator";
export class UserUpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    status: string;
}