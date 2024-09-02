import { User } from "src/users/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus, TaskType } from "./tasks.enum";

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({   type: "varchar",
                length: 150,
                nullable: false})
    name: string;

    @Column({   type: "enum",
                enum: TaskType,
                nullable: false})
    type: string;

    @Column({   type: "text",
                nullable: true})
    description: string;

    @Column({   type: "enum",
                enum: TaskStatus,
                nullable: false})
    status: string;

    @CreateDateColumn({ type: "date",
                        default: () => "CURRENT_TIMESTAMP(6)",
                        nullable: false})
    created_at: Date;

    @Column({   type: "date",
                nullable: true})
    deadline: Date;

    @ManyToOne(() => User, (user) => user.createdTasks)
    creator: User

    @ManyToOne(() => User, (user) => user.tasks)
    executor: User
}