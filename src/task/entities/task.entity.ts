import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { V5 as uuid } from 'uuid'

export class Task {
    @PrimaryGeneratedColumn(uuid)
    id:string

    @Column({unique:true})
    title:string

    @Column()
    des:string

    @Column()
    status: taskEnum
}

export enum taskEnum{
    open='OPEN',
    done='DONE',
}