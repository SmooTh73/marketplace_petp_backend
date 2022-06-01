import { Entity, PrimaryColumn } from "typeorm";
import { BaseUser } from './entities/base-user';
import { Store } from "./store-model";


@Entity({ name: 'seller' })
export class Seller extends BaseUser {

}