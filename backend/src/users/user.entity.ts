import { Role } from "src/roles/role.enum";
import { Task } from "src/tasks/task.entity";
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({   type: "varchar",
                length: 150,
                unique: true,
                nullable: false})
    @Index({ unique: true})
    email: string;

    @Column({   type: "varchar",
                length: 150,
                nullable: false,})
    password: string;

    @Column({   type: "simple-array",
                nullable: false,})
    roles: Role[];

    @OneToMany(() => Task, (task) => task.executor)
    tasks: Task[]


    @OneToMany(() => Task, (task) => task.creator)
    createdTasks: Task[]
}