// src/claim/claim.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Policy } from '../policy/policy.entity';
import { User } from '../user/user.entity';

@Entity()
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: string; // e.g., 'pending', 'approved', 'rejected'

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Policy, (policy) => policy.claims)
  policy: Policy;

  @ManyToOne(() => User, (user) => user.claims)
  user: User;
}
