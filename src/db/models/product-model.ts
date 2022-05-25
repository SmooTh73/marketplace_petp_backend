import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";
import { BaseClassification } from "./entities/base-classification";
import { Store } from "./store-model";
import { Rating } from './rating-model';


@Entity('type')
export class Type extends BaseClassification {
    @OneToMany(() => Product, (product) => product.type)
    products: Product[];

    @ManyToMany(() => Brand)
    @JoinTable({
        name: 'types_brands',
        joinColumn: {
            name: 'type_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'brand_id',
            referencedColumnName: 'id'
        }
    })
    brands: Brand[];
}

@Entity('brand')
export class Brand extends BaseClassification {
    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];

    @ManyToMany(() => Type)
    types: Type[];
}


@Entity({ name: 'product' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    rating: number;

    @ManyToOne(() => Store, (store) => store.products)
    @JoinColumn({
        name: 'store_id'
    })
    store: Store;

    @ManyToOne(() => Type, (type) => type.products)
    @JoinColumn({
        name: 'type_id'
    })
    type: Type;

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({
        name: 'brand_id'
    })
    brand: Brand;

    @OneToMany(() => Rating, (rating) => rating.product)
    ratings: Rating[];
}