import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  //   constructor(page: number = 1, limit: number = 10) {
  //     this.page = page;
  //     this.limit = limit;
  //   }

  //   get skip(): number {
  //     return (this.page - 1) * this.limit;
  //   }

  //   get take(): number {
  //     return this.limit;
  //   }
}
