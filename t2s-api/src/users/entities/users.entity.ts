import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity({name: "users"})
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "first_name", length: 50, nullable: true })
    firstName: string;

    @Column({ type: "varchar", name: "last_name", length: 50, nullable: true})
    lastName: string;

    @IsEmail()
    @Column({ type: "varchar", name: "email", length: 100 })
    email: string;

    @IsNotEmpty()
    @Column({ type: "text", name: "password" })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    } 

    @IsEmail()
    @Column({ type: "varchar", name: "mobile", length: 20 })
    mobileNumber: string;

    @Column({ type: "varchar", name: "role", length: 20, default: 'USERS' })
    role: string;      
  
    @CreateDateColumn({type: "timestamp", name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at"})
    updatedAt: Date;

    // 0 = INACTIVE , 1 = ACTIVE 
    @Column({ type: "integer", name: "status", default: 1 })
    status: number;      

}
