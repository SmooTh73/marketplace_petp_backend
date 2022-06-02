import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";


@Entity('token')
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    refresh: string;

    // @OneToOne()
}