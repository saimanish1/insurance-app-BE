// src/policy/policy.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { Policy } from './policy.entity';
import { Claim } from '../claim/claim.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policy, Claim])],
  providers: [PolicyService],
  controllers: [PolicyController],
})
export class PolicyModule {}
