import Chat from './Chat'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import User from './User';

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat
  
  @Column({ type: "text" })
  text: String

  @ManyToOne(type => User, user => user.messages)
  user: User

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Message;
