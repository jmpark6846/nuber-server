import { verificationTarget } from "../types/types";

import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import User from "./User";
import { userInfo } from "os";
const EMAIL = "EMAIL";
const PHONE = "PHONE";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", enum: [EMAIL, PHONE] })
  target: verificationTarget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  used: boolean;

  @ManyToOne(type => User, user => user.verifications)
  user: User
  
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    }else if(this.target === EMAIL){
      this.key = Math.random().toString(36).substr(2);
    }
  }
}

export default Verification;
