import { Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseUser } from './entities/base-user';
import { Token } from "./token-model";


@Entity({ name: 'seller' })
export class Seller extends BaseUser {
    @OneToOne(() => Token, token => token.refresh, { cascade: true })
    @JoinColumn({
        name: 'token_id'
    })
    token_id: Token;
}