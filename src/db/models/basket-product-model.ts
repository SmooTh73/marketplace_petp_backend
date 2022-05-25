import { Entity, Column, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Customer } from "./customer-model";
import { Product } from './product-model';
import { Basket } from "./basket-model";

@Entity({ name: 'basket_product' })
export class BasketProduct extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Basket, (basket) => basket.basket_products)
    @JoinColumn({
        name: 'basket_id'
    })
    basket: Basket;

    @OneToOne(() => Product)
    @JoinColumn({
        name: 'product_id',
    })
    product: Product;
}