import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model.js";
import { Project } from "./project.model.js";
import { Status } from "./status.model.js";

interface TaskCreationAttrs {
    userId: number;
    projectId: number;
    title: string;
    description?: string;
}

@Table({ tableName: "tasks" })
export class Task extends Model<Task, TaskCreationAttrs>{

    @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    declare userId: number;

    @ForeignKey(() => Status)
    @Column({type: DataType.INTEGER})
    declare statusId: number;

    @ForeignKey(() => Project)
    @Column({type: DataType.INTEGER})
    declare projectId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare title: string;

    @Column({ type: DataType.STRING })
    declare description: string;
}