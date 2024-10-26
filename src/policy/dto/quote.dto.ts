import {
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CoveragePreferencesDto,
  DriverDetailsDto,
  VehicleInformationDto,
} from './create-quote';

export class QuoteDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  premium: number;

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
