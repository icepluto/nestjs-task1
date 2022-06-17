import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    title:string

    @Column()
    desc:string

    @Column()
    status: taskEnum
}

export enum taskEnum{
    open='OPEN',
    done='DONE',
}
