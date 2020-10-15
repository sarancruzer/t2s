import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { Stores } from "src/stores/entities/stores.entity";

@Entity({name: "customers"})
export class Customers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "first_name", length: 50 })
    firstName: string;

    @Column({ type: "varchar", name: "last_name", length: 50})
    lastName: string;

    @IsEmail()
    @Column({ type: "varchar", name: "email", length: 100 })
    email: string;   
  
    @Column({ type: "varchar", name: "mobile", length: 20, nullable: true })
    mobileNumber: string;    
  
    @CreateDateColumn({type: "timestamp", name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at"})
    updatedAt: Date;

    // 0 = INACTIVE , 1 = ACTIVE 
    @Column({ type: "integer", name: "status", default: 1 })
    status: number;      

    @ManyToOne(type => Stores)
    @JoinColumn({name: 'store_id', referencedColumnName: 'id'})
    stores: Stores;

}
