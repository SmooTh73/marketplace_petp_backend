import { Entity, PrimaryColumn } from "typeorm";
import { BaseUser } from './entities/base-user';
import { Store } from "./store-model";


@Entity({ name: 'store-owner' })
export class StoreOwner extends BaseUser {

}