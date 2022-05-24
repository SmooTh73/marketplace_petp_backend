import { Entity, PrimaryColumn } from "typeorm";
import { BaseUser } from './entities/base-user';


@Entity({ name: 'store-owner' })
export class StoreOwner extends BaseUser {
    
}