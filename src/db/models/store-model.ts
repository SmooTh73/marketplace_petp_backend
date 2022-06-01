import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Seller } from "./seller-model";
import { Product } from "./product-model";


@Entity('store')
export class Store extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(() => Seller)
    @JoinColumn()
    seller: Seller

    @OneToMany(() => Product, (product) => product.store)
    products: Product[];
}