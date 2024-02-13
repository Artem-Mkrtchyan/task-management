import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model.js";

interface CommentCreationAttr {
    userId: number;
    taskId: number;
    description: string;
}

@Table({tableName: "comments"})
export class Comment extends Model<Comment, CommentCreationAttr> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    declare id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    declare userId: number;

    @Column({type: DataType.STRING, allowNull: false})
    declare description: string;
}