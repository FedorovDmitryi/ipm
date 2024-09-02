import { IsDateString, IsEnum, IsNotEmpty, IsString, isEnum } from "class-validator";
import { TaskType } from "../tasks.enum";
export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    executor: number;

    @IsNotEmpty()
    @IsDateString()
    deadline: Date;

    @IsEnum(TaskType)
    type: TaskType;

    @IsNotEmpty()
    @IsString()
    description: string;
}