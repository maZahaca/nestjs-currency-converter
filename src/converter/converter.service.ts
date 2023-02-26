import { Injectable, NotAcceptableException } from '@nestjs/common';
import { EcbService } from '../providers/ecb.service';
import { CurrencyProvider, ExchangeRate, GetRatesResponse } from '../providers/interfaces/currency.provider';
import { ConverterResponseInterface } from './interfaces/converterResponse.interface';

@Injectable()
export class ConverterService {
  private providers: CurrencyProvider[]

  constructor(ecbProvider: EcbService) {
    this.providers = [
      ecbProvider,
    ];
  }

  private async fetchRates(): Promise<GetRatesResponse[]> {
    return Promise.all(this.providers.map((client) => client.GetRates()));
  }

  private getConversionRate(rates: ExchangeRate[], currency: string) {
    const rate = rates.find((r) => r.currency === currency);
    if (!rate) {
      throw new NotAcceptableException(`Currency ${currency} is not supported`);
    }
    return rate.rate;
  }

  async convert(sellCurrency: string, buyCurrency: string, sellAmount: number): Promise<ConverterResponseInterface> {
    const aggregatedRates = await this.fetchRates();

    // TODO: this is done just for 1 provider, add support for multi-provider rates
    const provider1 = aggregatedRates[0];

    const rates = [
      ...provider1.rates,
      {
        rate: 1,
        currency: provider1.baseCurrency,
      },
    ];
    const rate = this.getConversionRate(rates, buyCurrency) / this.getConversionRate(rates, sellCurrency);
    const conversionRate = Math.ceil(rate * 100000) / 100000;

    return {
      conversionRate,
      buyAmount: Math.floor(sellAmount * conversionRate * 100) / 100,
      sellAmount,
      buyCurrency,
      sellCurrency,
    };
  }
}
