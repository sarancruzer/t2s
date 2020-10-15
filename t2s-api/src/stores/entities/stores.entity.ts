import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Customers } from "src/customers/entities/customers.entity";

@Entity({name: "stores"})
export class Stores {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "store_name", length: 50, nullable: true })
    storeName: string;  

    @IsEmail()
    @Column({ type: "varchar", name: "email", length: 100 })
    email: string;

    @Column({ type: "text", name: "address" })
    address: string;

    @Column({ type: "varchar", name: "mobile", length: 20 })
    mobileNumber: string;
    
    @CreateDateColumn({type: "timestamp", name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at"})
    updatedAt: Date;

    // 0 = INACTIVE , 1 = ACTIVE 
    @Column({ type: "integer", name: "status", default: 1 })
    status: number;      

    @OneToMany(type => Customers, customers => customers.stores)
    customers: Customers[];

}
