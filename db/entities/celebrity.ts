import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class celebrity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    path: string

    @Column({
        length: 10000
    }) result: string

}