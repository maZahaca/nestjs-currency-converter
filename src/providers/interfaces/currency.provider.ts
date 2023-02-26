export interface ExchangeRate {
  currency: string;
  rate: number;
}

export interface GetRatesResponse {
  /**
   * The cost of 1 unit of baseCurrency in rate currency. E.g:
   * baseCurrency = EUR
   * currency = USD
   * rate = 1.1138 - the cost of 1 EUR in USD
   */
  baseCurrency: string;
  rates: ExchangeRate[];
}

export interface CurrencyProvider {
  GetRates(): Promise<GetRatesResponse>;
}
