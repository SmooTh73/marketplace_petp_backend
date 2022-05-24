import { Entity, BaseEntity, PrimaryColumn, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";


@Entity({ name: 'product' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    rating: number;
}   