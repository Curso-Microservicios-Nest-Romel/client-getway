import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
// import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
// implements RpcExceptionFilter<RpcException>
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    // return throwError(() => exception.getError());
    // throw new RpcException(exception.getError());
    console.log('Paso por el excepcion filter');
    const ctx = host.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = ctx.getResponse();

    const rpcError = exception.getError();
    console.log({ rpcError });

    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const { status } = rpcError as { status: unknown; message: unknown };
      console.log({ status });
      const numericStatus = isNaN(Number(status)) ? 400 : Number(status);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return response.status(numericStatus).json(rpcError);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    response.status(401).json({
      status: 400,
      message: rpcError,
    });
  }
}
