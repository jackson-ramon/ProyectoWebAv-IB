import { ProductEntity } from "src/products/entities/product.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn({primaryKeyConstraintName:'pk_user_id'})
    id: number;

    @Column()
    name: string;
    
    @Column({unique: true, nullable : false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false})
    favoriteMovie: string;

    @OneToMany(() => ProductEntity, product => product.user)
    products: ProductEntity[];

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
