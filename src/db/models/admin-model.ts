import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity('admin')
export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    password: string

    @Column({
        type: 'boolean'
    })
    super: boolean;
}