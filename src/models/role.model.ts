import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "./user.model.js";
import { UserRoles } from "./user-roles.model.js";

interface RoleCreationAttrs {
    userId: number;
    title: string;
}

@Table({ tableName: "role" })
export class Role extends Model<Role, RoleCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare title: string;

    @BelongsToMany(() => User, () => UserRoles)
    declare users: User[];
}