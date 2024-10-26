// src/policy/policy.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Claim } from '../claim/claim.entity';

export class DriverDetails {
  @Column()
  name: string;

  @Column()
  age: number;
}

export class VehicleInformation {
  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;
}

export class CoveragePreferences {
  @Column()
  coverageAmount: number;

  @Column()
  deductible: number;
}

@Entity()
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  premium: number;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.policies)
  user: User;

  @Column(() => DriverDetails)
  driverDetails: DriverDetails;

  @Column(() => VehicleInformation)
  vehicleInformation: VehicleInformation;

  @Column(() => CoveragePreferences)
  coveragePreferences: CoveragePreferences;

  @OneToMany(() => Claim, (claim) => claim.policy)
  claims: Claim[];
}
