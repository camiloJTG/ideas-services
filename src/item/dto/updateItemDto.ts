import { IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  updatedAt: Date;
}
