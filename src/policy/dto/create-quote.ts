// src/policy/dto/create-quote.dto.ts

import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DriverDetailsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  age: number;
}

export class VehicleInformationDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  year: number;
}

export class CoveragePreferencesDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  coverageAmount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(100)
  deductible: number;
}

export class CreateQuoteDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DriverDetailsDto)
  driverDetails: DriverDetailsDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => VehicleInformationDto)
  vehicleInformation: VehicleInformationDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CoveragePreferencesDto)
  coveragePreferences: CoveragePreferencesDto;
}
