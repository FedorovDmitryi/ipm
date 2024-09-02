import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/user.entity';
import { AdminUpdateTaskDto } from './dto/admin-update-task.dto';
import { UserUpdateTaskDto } from './dto/user-update-task.dto';
import { CustomResponse } from 'src/interface/CustomResponse';
import { TaskStatus } from './tasks.enum';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>,
                @InjectRepository(User) private userRepository: Repository<User>){}

    async getAllTask(user): Promise<Task[]> {
        const tasks = await this.tasksRepository
          .createQueryBuilder('task')
          .innerJoinAndSelect('task.executor', 'executor')
          .select([
            'task.id',
            'task.name',
            'task.type',
            'task.status',
            'task.deadline',
            'executor.id',
        ])
          .where('executor.id = :id', { id: user.sub })
          .andWhere('task.status != :status', {status: 'ЗАВЕРШЕНА'})
          .getMany();
        return tasks;
    }

    async getAllTaskAdmin(user): Promise<Task[]> {
        const tasks = await this.tasksRepository
          .createQueryBuilder('task')
          .innerJoinAndSelect('task.creator', 'creator')
          .innerJoinAndSelect('task.executor', 'executor')
          .select([
            'task.id',
            'task.name',
            'task.type',
            'task.status',
            'task.deadline',
            'executor.email',
            'creator.id',
        ])
          .where('creator.id = :id', { id: user.sub })
          .getMany();
        return tasks;
    }
    
    async getOne(id: number): Promise<Task>{
        const task = await this.tasksRepository
            .createQueryBuilder('task')
            .innerJoinAndSelect('task.executor', 'executor')
            .where('task.id = :id', { id })
            .select([
                'task.id',
                'task.name',
                'task.type',
                'task.status',
                'task.created_at',
                'task.deadline',
                'task.description',
                'executor.email',
            ])
            .getOne();
        return task;
    }

    async createTask (dto: CreateTaskDto, reqUser): Promise<CustomResponse>{
        const { name, type, description, executor, deadline } = dto;
        const task = new Task();
        task.status = TaskStatus.NEW;
        task.name = name;
        task.type = type;
        task.description = description;
        task.deadline = deadline;

        const creatorUser = await this.userRepository.findOne({
            where: { id: reqUser.sub},
          });
        task.creator = creatorUser;
      
        const executorUser = await this.userRepository.findOne({
            where: { id: executor },
          });
      
        task.executor = executorUser;

        try {
            await this.tasksRepository.save(task);
        } catch(error){
            throw new ConflictException();
        }
        return {status: 'success'};
    }

    async updateForAdmin (dto: AdminUpdateTaskDto, id: number): Promise<CustomResponse>{
        const { name, type, status, description, deadline } = dto;
        const task = await this.tasksRepository.findOneBy({ id });
        task.status = status;
        task.name = name;
        task.type = type;
        task.description = description;
        task.deadline = deadline;
        try {
            await this.tasksRepository.save(task);
        } catch(error){
            throw new ConflictException();
        }
        return {status: 'success'};
    }

    async updateForUser (dto: UserUpdateTaskDto, id: number): Promise<CustomResponse>{
        const {status} = dto;
        const task = await this.tasksRepository.findOneBy({ id });
        task.status = status;
        try {
            await this.tasksRepository.save(task);
        } catch(error){
            throw new ConflictException();
        }
        return {status: 'success'};
    }

    async delete (id: number): Promise<CustomResponse>{
        const task = await this.tasksRepository.findOneBy({ id });
        try {
            await this.tasksRepository.delete(id);
        } catch(error){
            throw new ConflictException();
        }
        return {status: 'success'};
    }
}
