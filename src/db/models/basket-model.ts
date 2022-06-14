import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Customer } from "./customer-model";
import { BasketProduct } from "./basket-product-model";


@Entity({ name: 'basket' })
export class Basket extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Customer)
    @JoinColumn({
        name: 'customer_id'
    })
    customer: Customer;

    @OneToMany(() => BasketProduct, (basket_product) => basket_product.basket)
    basket_products: BasketProduct;

}