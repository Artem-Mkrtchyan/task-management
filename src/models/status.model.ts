import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "./task.model.js";

interface StatusCreationAttrs {
    value: string;
}

@Table({tableName: "statuses"})
export class Status extends Model<Status, StatusCreationAttrs> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    declare id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false, defaultValue: "Открыто"})
    declare value: string;

    @HasMany(() => Task)
    declare tasks: Task[];
}