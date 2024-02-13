import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Board } from "./board.model.js";
import { Project } from "./project.model.js";

@Table({tableName: "board-projects", createdAt: false, updatedAt: false})
export class BoardProjects extends Model<BoardProjects> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    declare id: number;

    @ForeignKey(() => Board)
    @Column({type: DataType.INTEGER})
    declare boardId: number;

    @ForeignKey(() => Project)
    @Column({type: DataType.INTEGER})
    declare projectId: number;
}