import { UserEntity } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn({primaryKeyConstraintName:'pk_product_id'})
    id: number;

    @Column({nullable: false})
    name: string;
    
    @Column({nullable: false})
    price: number;

    @Column({nullable: true})
    imageUrl: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => UserEntity, userEntity => userEntity.id, {eager: true})
    user: UserEntity
}
