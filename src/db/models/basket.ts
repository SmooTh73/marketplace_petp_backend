import { Entity, Column, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'basket' })
export class Basket extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

}

@Entity({ name: 'basket_product' })
export class BasketProduct extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}