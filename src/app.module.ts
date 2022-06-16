import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import {  TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TaskModule,TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 49154,
      username: 'postgres',
      password: '123456',
      database: 'task2',
      autoLoadEntities:true,
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
