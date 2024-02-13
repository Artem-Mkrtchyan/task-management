import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";

interface TokenCreationAttr {
    refreshToken: string;
    userId: number;
}

@Table({ tableName: "tokens" })
export class Token extends Model<Token, TokenCreationAttr>{

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true })
    declare id: number;

    @Column({ type: DataType.INTEGER })
    declare userId: number;

    @Column({ type: DataType.STRING })
    declare refreshToken: string;
}