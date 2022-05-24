import { Entity, Column, CreateDateColumn } from "typeorm";
import { BaseUser } from "./entities/base-user";

@Entity({ name: 'customer' })
export class Customer extends BaseUser {
    
}