import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { StoreOwner } from "./store-owner-model";
import { Product } from "./product-model";


@Entity('store')
export class Store extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(() => StoreOwner)
    @JoinColumn()
    store_owner: StoreOwner

    @OneToMany(() => Product, (product) => product.store)
    products: Product[];
}