// src/policy/policy.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PurchasePolicyDto } from './dto/purchase-policy.dto';
import { ClaimDto } from './dto/claim.dto';
import { QuoteDto } from './dto/quote.dto';
import { CreateQuoteDto } from './dto/create-quote';

@Controller('policy')
export class PolicyController {
  constructor(private policyService: PolicyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPolicy(@Body() createPolicyDto: CreatePolicyDto, @Request() req) {
    return this.policyService.createPolicy(createPolicyDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPolicies(@Request() req) {
    const userId = req.user.userId;
    return this.policyService.getPolicies(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPolicy(@Param('id') id: number, @Request() req) {
    return this.policyService.findOne(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePolicy(
    @Param('id') id: number,
    @Body() updatePolicyDto: UpdatePolicyDto,
    @Request() req,
  ) {
    return this.policyService.updatePolicy(id, updatePolicyDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePolicy(@Param('id') id: number, @Request() req) {
    return this.policyService.deletePolicy(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('quote')
  async generateQuote(@Body() quoteDto: CreateQuoteDto) {
    return this.policyService.generateQuote(quoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('purchase')
  async purchasePolicy(
    @Body() purchasePolicyDto: PurchasePolicyDto,
    @Request() req,
  ) {
    const user = req.user;
    return this.policyService.purchasePolicy(purchasePolicyDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/renew')
  async renewPolicy(@Param('id') id: number, @Request() req) {
    return this.policyService.renewPolicy(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/claim')
  async fileClaim(
    @Param('id') id: number,
    @Body() claimDto: ClaimDto,
    @Request() req,
  ) {
    return this.policyService.fileClaim(id, claimDto, req.user);
  }
}
