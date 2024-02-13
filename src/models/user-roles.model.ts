import { Column, DataType, ForeignKey, Table, Model } from "sequelize-typescript";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    declare userId: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    declare roleId: number;
}