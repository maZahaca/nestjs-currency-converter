import { Injectable } from '@nestjs/common';
import { CurrencyProvider, GetRatesResponse } from './interfaces/currency.provider';
import { XMLParser } from "fast-xml-parser";

@Injectable()
export class EcbService implements CurrencyProvider {
  private RATE_URL = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
  private BASE_CURRENCY = 'EUR';

  async GetRates(): Promise<GetRatesResponse> {
    const response = await fetch(this.RATE_URL);
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const {
      'gesmes:Envelope': {
        Cube: {
          Cube: { Cube: rates },
        },
      },
    } = parser.parse(await response.text());

    return {
      rates,
      baseCurrency: this.BASE_CURRENCY,
    };
  }
}
