import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from '../config/services';
import { envs } from '../config/envs';
console.log(envs.ORDER_MICROSERVICE_HOST, envs.ORDER_MICROSERVICE_PORT);
@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ORDER_MICROSERVICE_HOST,
          port: envs.ORDER_MICROSERVICE_PORT,
          // host: 'localhost',
          // port: 3002,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
