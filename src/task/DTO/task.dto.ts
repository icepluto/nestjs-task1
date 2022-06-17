import { taskEnum } from "../entities/task.entity"
import { IsNotEmpty } from 'class-validator'

export class TaskDto{
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    desc:string

    status?:taskEnum
}