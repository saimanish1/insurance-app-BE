// src/policy/dto/purchase-policy.dto.ts

import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuoteDto } from './quote.dto';

export class PurchasePolicyDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => QuoteDto)
  quote: QuoteDto;
}
