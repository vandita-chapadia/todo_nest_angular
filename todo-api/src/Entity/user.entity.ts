import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt"
import { TodoEntity } from "./todo.entity";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()

    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(()=>TodoEntity,(todo)=>todo.user)
     todos:TodoEntity[]
   



    // async verifyPassword(password: string) {
    //     const hash: string = await bcrypt.hash(password, this.salt);
    //     return hash === this.password;

    //     //return await bcrypt.compare(password, this.password)
    // }



}