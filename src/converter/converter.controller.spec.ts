import { Test, TestingModule } from '@nestjs/testing';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { ProvidersModule } from "../providers/providers.module";

describe('ConverterController', () => {
  let appController: ConverterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ProvidersModule],
      controllers: [ConverterController],
      providers: [ConverterService],
    }).compile();

    appController = app.get<ConverterController>(ConverterController);
  });

  describe('convert', () => {
    it('should convert value based on the rates', async () => {
      const response = await appController.convert({
        sellCurrency: 'GBP',
        buyCurrency: 'USD',
        sellAmount: 100,
      });
      expect(response).toBe({
        conversionRate: 1.13321,
        buyAmount: 113.32,
        sellAmount: 100,
        buyCurrency: 'EUR',
        sellCurrency: 'GBP',
      });
    });
  });
});
