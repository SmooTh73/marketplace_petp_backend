import { Entity, Column,PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./product-model";
import { Customer } from "./customer-model";


@Entity('rating')
export class Rating extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'float'
    })
    rate: number;

    @ManyToOne(() => Product, (product) => product.ratings)
    @JoinColumn({
        name: 'product_id',
    })
    product: Product;

    @ManyToOne(() => Customer, (customer) => customer.ratings)
    @JoinColumn({
        name: 'customer_id'
    })
    customer: Customer;
}