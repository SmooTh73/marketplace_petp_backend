import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Length, IsEmail } from "class-validator";


@Entity()
export class BaseUser extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(8)
    password: string;
}