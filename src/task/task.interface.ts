import { taskEnum } from "./entities/task.entity";

export interface ITask {
    title:string,
    desc:string,
    status?:taskEnum
}