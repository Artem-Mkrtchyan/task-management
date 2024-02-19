import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model.js";

interface TokenCreationAttr {
    refreshToken: string;
    userId: number;
}

@Table({ tableName: "tokens" })
export class Token extends Model<Token, TokenCreationAttr>{

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true })
    declare id: number;

    @ForeignKey(() => User)
    declare userId: number;

    @Column({ type: DataType.STRING })
    declare refreshToken: string;
}