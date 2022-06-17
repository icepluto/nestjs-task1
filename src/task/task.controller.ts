import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskDto } from './DTO/task.dto';
import { taskEnum } from './entities/task.entity';
import { ITask } from './task.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }
  @Get('all')
  async getAll():Promise<ITask[]> {
    return this.taskService.getAllTasks()
  }

  @Post('creatTask')
  async creatTask(@Body() body:TaskDto):Promise<ITask>{
    return this.taskService.createTask(body)
  }

  @Post('findTaskById/:id')
  async getTaskById(@Param("id") id:string):Promise<ITask>{
    
    return this.taskService.getTaskById(id)
  }

  @Patch(':id/status')
  async modifyTaskStatus(
    @Param("id") id:string,
    @Body() body:TaskDto
  ){
    const {status} = body
    return this.taskService.modifyTaskStatus(id,status)
  }

  @Post('searchByTitle')
  async searchByTitle(
    @Body() body:TaskDto,
  ){
    return this.taskService.searchByTitle(body)
  }

  @Delete('remove/:id')
  async remove(@Param("id") id:string):Promise<void>{
    return this.taskService.remove(id)
  }
}
