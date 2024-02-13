import { Column, Model, DataType, Table, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { User } from "./user.model.js";
import { Project } from "./project.model.js";
import { BoardProjects } from "./board-projects.model.js";

interface BoardCreationAttrs {
    userId: number;
    title: string;
}

@Table({tableName: "boards"})
export class Board extends Model<Board, BoardCreationAttrs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    declare userId: number;

    @Column({type: DataType.STRING, allowNull: false})
    declare title: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    declare private: string;

    @BelongsToMany(() => Project, () => BoardProjects)
    declare projects: Project[];
}