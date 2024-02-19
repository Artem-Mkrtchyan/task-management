import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Role } from "./role.model.js";
import { UserRoles } from "./user-roles.model.js";
import { Board } from "./board.model.js";
import { Project } from "./project.model.js";
import { Task } from "./task.model.js";
import { Comment } from "./comment.model.js";
import { Token } from "./token.model.js";

interface UserCreationAttrs {
    email: string;
    password: string;
    activationLink: string;
}

@Table({ tableName: "user" })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    declare email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    declare password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    declare isActivated: boolean;

    @Column({type: DataType.STRING})
    declare activationLink: string;

    @BelongsToMany(() => Role, () => UserRoles)
    declare roles: Role[];

    @HasOne(() => Token)
    declare refreshToken: Token;

    @HasMany(() => Board)
    declare boards: Board[];

    @HasMany(() => Project)
    declare projects: Project[];

    @HasMany(() => Task)
    declare tasks: Task[];

    @HasMany(() => Comment)
    declare comments: Comment[];
}