import { BoardProjects } from "./board-projects.model.js";
import { Board } from "./board.model.js";
import { Comment } from "./comment.model.js";
import { Project } from "./project.model.js";
import { Role } from "./role.model.js";
import { Status } from "./status.model.js";
import { Task } from "./task.model.js";
import { Token } from "./token.model.js";
import { UserRoles } from "./user-roles.model.js";
import { User } from "./user.model.js";

export const models = [User, Board, Project, Task, Comment, Status, Role, UserRoles, BoardProjects, Token];