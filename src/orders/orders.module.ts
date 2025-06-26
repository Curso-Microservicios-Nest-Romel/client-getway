import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
// import { envs } from '../config/envs';
import { NatsModule } from '../transports/nats.module';
// console.log(envs.ORDER_MICROSERVICE_HOST, envs.ORDER_MICROSERVICE_PORT);
@Module({
  controllers: [OrdersController],
  imports: [NatsModule],
})
export class OrdersModule {}
