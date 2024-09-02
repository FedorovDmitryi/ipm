import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { Request } from 'express';
import { AdminUpdateTaskDto } from './dto/admin-update-task.dto';
import { UserUpdateTaskDto } from './dto/user-update-task.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { CustomResponse } from 'src/interface/CustomResponse';

@Controller('/api/tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllUser(@Req() req: Request): Promise<Task[]> {
        return this.tasksService.getAllTask(req.user);
    }

    @Roles(Role.Admin)
    @Get('/admin')
    getAllAdmin(@Req() req: Request): Promise<Task[]> {
        return this.tasksService.getAllTaskAdmin(req.user);
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getOne(+id);
    }

    @Roles(Role.Admin)
    @Post('/create')
    create( @Body() dto: CreateTaskDto,
            @Req() req: Request 
            ): Promise<CustomResponse> {
        return this.tasksService.createTask(dto,req.user);
    }

    @Post(':id')
    async update(   @Body() dto: any,
                    @Param('id') id: string,
                    @Req() req: Request 
                    ): Promise<CustomResponse> {
        const userRole = (req.user as any).roles[0];
        switch (userRole) {
            case 'admin': {
                const adminDto = dto as AdminUpdateTaskDto;
                await this.tasksService.updateForAdmin(adminDto, +id);
                break;
            }
            case 'user': {
                const userDto = dto as UserUpdateTaskDto;
                await this.tasksService.updateForUser(userDto, +id);
                break;
            }
            default:
                throw new Error('Invalid user role');
        }
        return {status: 'success'};
    }

    @Roles(Role.Admin)
    @Delete(':id')
    delete(@Param('id') id: string): void{
        this.tasksService.delete(+id);
    }

}
