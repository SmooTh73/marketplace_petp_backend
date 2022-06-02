import { Entity, Column, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseUser } from "./entities/base-user";
import { Rating } from "./rating-model";
import { Token } from './token-model';


@Entity({ name: 'customer' })
export class Customer extends BaseUser {
    @OneToMany(() => Rating, (ratings) => ratings.customer)
    ratings: Rating[];

    @OneToOne(() => Token, token => token.refresh, { cascade: true })
    @JoinColumn()
    token_id: Token;
}