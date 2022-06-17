import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository,Like } from 'typeorm';
import { TaskDto } from './DTO/task.dto';
import { Task, taskEnum } from './entities/task.entity';
import { ITask } from './task.interface'
import { V5 as uuid } from 'uuid'

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }

    async createTask(task: TaskDto): Promise<ITask> {
        const { title, desc, status } = task
        const atask = {
            id: uuid,
            title,
            desc,
            status
        }
        const newTask = await this.taskRepository.create(atask)
        await this.taskRepository.save(newTask)
        return newTask
    }

    async getAllTasks(): Promise<ITask[]> {
        return await this.taskRepository.find()
    }

    async getTaskById(id: string): Promise<ITask> {
        const found = this.taskRepository.findOne({
            where: {
                id: id
            }
        })
        return found
    }

    async modifyTaskStatus(id: string, status: taskEnum): Promise<ITask> {
        let nTask = await this.getTaskById(id)
        nTask.status = status
        return nTask
    }
    async remove(id: string): Promise<void> {
        const found = await this.getTaskById(id)
        if(!found){
            throw new NotFoundException(`your '${id}' is not found`)
        }
        await this.taskRepository.delete(id)
    }

    async searchByTitle(body: TaskDto):Promise<ITask[]> {
        const { title } = body
        const nTask = await this.taskRepository.find({
            where: {
                title:Like(`%${title}%`)
            }
        })
        if(nTask[0]){
            return nTask
        }else{
            throw new NotFoundException(`${title} is not found`)
        }
    }
}
