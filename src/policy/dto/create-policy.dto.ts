import { IsNotEmpty, IsDecimal, IsNumber } from 'class-validator';

export class CreatePolicyDto {
  @IsNotEmpty()
  type: string;

  @IsDecimal()
  coverageAmount: number;

  @IsDecimal()
  premium: number;

  @IsNumber()
  termLength: number;

  @IsNotEmpty()
  status: string;
}
