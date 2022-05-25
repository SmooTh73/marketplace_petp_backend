import { Entity, Column, CreateDateColumn, OneToMany } from "typeorm";
import { BaseUser } from "./entities/base-user";
import { Rating } from "./rating-model";


@Entity({ name: 'customer' })
export class Customer extends BaseUser {
    @OneToMany(() => Rating, (ratings) => ratings.customer)
    ratings: Rating[];
}