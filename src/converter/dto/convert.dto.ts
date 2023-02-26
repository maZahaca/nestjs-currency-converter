import { IsString, IsNumber, isDecimal, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ConvertDTO {
  @IsString()
  sellCurrency: string;

  @IsString()
  buyCurrency: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  sellAmount: number;
}
