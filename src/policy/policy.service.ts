// src/policy/policy.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Policy } from './policy.entity';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { PurchasePolicyDto } from './dto/purchase-policy.dto';
import { Claim } from '../claim/claim.entity';
import { ClaimDto } from './dto/claim.dto';
import { CreateQuoteDto } from './dto/create-quote';
import { User } from '../user/user.entity';
import { QuoteDto } from './dto/quote.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private policyRepository: Repository<Policy>,
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) {}

  async createPolicy(createPolicyDto: CreatePolicyDto, user): Promise<Policy> {
    const policy = this.policyRepository.create({ ...createPolicyDto, user });
    return this.policyRepository.save(policy);
  }

  async getPolicies(userId): Promise<Policy[]> {
    return this.policyRepository.find({ where: { id: userId } });
  }

  async findOne(id: number, user): Promise<Policy> {
    return this.policyRepository.findOne({ where: { id, user } });
  }

  async updatePolicy(
    id: number,
    updatePolicyDto: UpdatePolicyDto,
    user,
  ): Promise<Policy> {
    await this.policyRepository.update({ id, user }, updatePolicyDto);
    return this.findOne(id, user);
  }

  async deletePolicy(id: number, user): Promise<void> {
    await this.policyRepository.delete({ id, user });
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<any> {
    // Calculate the premium using the generateQuote method
    const quote = await this.generateQuote(createQuoteDto);

    // If you want to save the quote to the database, you can do so here

    // Return the quote with the calculated premium
    return quote;
  }

  async generateQuote(createQuoteDto: CreateQuoteDto): Promise<any> {
    const { driverDetails, vehicleInformation, coveragePreferences } =
      createQuoteDto;

    // Extract data
    const age = driverDetails.age;
    const vehicleYear = vehicleInformation.year;
    const coverageAmount = coveragePreferences.coverageAmount;
    const deductible = coveragePreferences.deductible;

    // Base premium calculation logic
    let premium = 100; // Base premium

    // Adjust premium based on driver's age
    if (age < 25) {
      premium *= 1.5; // Increase by 50% for drivers under 25
    } else if (age > 60) {
      premium *= 1.2; // Increase by 20% for drivers over 60
    }

    // Adjust premium based on vehicle age
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicleYear;

    if (vehicleAge < 5) {
      premium *= 1.1; // Increase by 10% for vehicles less than 5 years old
    } else if (vehicleAge > 10) {
      premium *= 0.9; // Decrease by 10% for vehicles older than 10 years
    }

    // Adjust premium based on coverage amount
    premium += coverageAmount * 0.01; // Add 1% of coverage amount

    // Adjust premium based on deductible
    if (deductible < 500) {
      premium *= 1.2; // Increase by 20% for low deductible
    } else if (deductible > 1000) {
      premium *= 0.8; // Decrease by 20% for high deductible
    }

    // Round premium to two decimal places
    premium = Math.round(premium * 100) / 100;

    // Return the quote object with the calculated premium and other details
    return {
      premium,
      driverDetails,
      vehicleInformation,
      coveragePreferences,
      createdAt: new Date(),
    };
  }

  async purchasePolicy(
    purchasePolicyDto: PurchasePolicyDto,
    user: User,
  ): Promise<Policy> {
    const { quote } = purchasePolicyDto;

    const policy = this.policyRepository.create({
      type: 'Auto Insurance',
      premium: quote.premium,
      status: 'active',
      user: user,
      driverDetails: quote.driverDetails,
      vehicleInformation: quote.vehicleInformation,
      coveragePreferences: quote.coveragePreferences,
    });

    return this.policyRepository.save(policy);
  }

  async renewPolicy(id: number, user): Promise<Policy> {
    const policy = await this.policyRepository.findOne({
      where: { id, user },
    });
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }
    // Logic to renew the policy (e.g., extend term, reset status)
    policy.status = 'active';
    policy.createdAt = new Date();
    return this.policyRepository.save(policy);
  }

  async fileClaim(id: number, claimDto: ClaimDto, user): Promise<Claim> {
    const policy = await this.policyRepository.findOne({
      where: { id, user },
    });
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }
    // Create a new claim
    const claim = this.claimRepository.create({
      ...claimDto,
      policy,
      user,
    });
    return this.claimRepository.save(claim);
  }
}
