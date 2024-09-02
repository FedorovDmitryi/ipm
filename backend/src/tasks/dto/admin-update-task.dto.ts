import {IsDateString, IsNotEmpty, IsString } from "class-validator";
export class AdminUpdateTaskDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    executor: number;

    @IsNotEmpty()
    @IsDateString()
    deadline: Date;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}