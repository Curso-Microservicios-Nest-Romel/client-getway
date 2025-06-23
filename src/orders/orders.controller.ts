import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log({ createOrderDto });
    return this.ordersClient.send({ cmd: 'createOrder' }, createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    console.log({ orderPaginationDto });
    return this.ordersClient.send({ cmd: 'findAllOrders' }, orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const order = await firstValueFrom(
        this.ordersClient.send({ cmd: 'findOneOrder' }, { id }),
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return order;
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() orderPaginationDto: OrderPaginationDto,
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const order = await firstValueFrom(
        this.ordersClient.send(
          { cmd: 'findAllByStatus' },
          {
            ...orderPaginationDto,
            status: statusDto.status,
          },
        ),
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return order;
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.ordersClient.send(
        { cmd: 'changeOrderStatus' },
        {
          status: statusDto.status,
          id,
        },
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
