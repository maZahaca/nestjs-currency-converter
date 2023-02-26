import { Module } from '@nestjs/common';
import { EcbService } from './ecb.service';

@Module({
  imports: [],
  controllers: [],
  providers: [EcbService],
  exports: [EcbService],
})
export class ProvidersModule {
}
