import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @Column()
  email!: string;

  @Column()
  password!: string;

  async setPassword(password: string) {
    this.password = await hash(password, 10);
  }
}
