import { IsNumberString, IsOptional } from 'class-validator';

export class Paginator {
  @IsNumberString()
  @IsOptional()
  cant: number;

  @IsNumberString()
  @IsOptional()
  page: number;
}
