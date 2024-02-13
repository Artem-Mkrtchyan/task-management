import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./user.model.js";
import { Board } from "./board.model.js";
import { BoardProjects } from "./board-projects.model.js";
import { Task } from "./task.model.js";

interface ProjectCreationAttrs {
    userId: number;
    boardId?: number;
    title: string;
}

@Table({tableName: "projects"})
export class Project extends Model<Project, ProjectCreationAttrs> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    declare id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    declare userId: number;

    @Column({type: DataType.STRING, allowNull: false})
    declare title: string;

    @BelongsToMany(() => Board, () => BoardProjects)
    declare boards: Board[];

    @HasMany(() => Task)
    declare tasks: Task[];
}