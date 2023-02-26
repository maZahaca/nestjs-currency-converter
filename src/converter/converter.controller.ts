import { Controller, Get, Query, Req } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConverterResponseInterface } from "./interfaces/converterResponse.interface";
import { ConvertDTO } from "./dto/convert.dto";

@Controller()
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {
  }

  @Get('/convert')
  convert(
    @Query() req: ConvertDTO,
  ): Promise<ConverterResponseInterface> {
    return this.converterService.convert(req.sellCurrency, req.buyCurrency, req.sellAmount);
  }
}
