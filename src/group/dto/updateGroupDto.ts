import { IsOptional, IsNotEmpty, IsString } from 'class-validator';
export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  updatedAt: Date;
}
