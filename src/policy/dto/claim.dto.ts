// src/policy/dto/claim.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class ClaimDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
