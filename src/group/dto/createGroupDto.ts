import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}/)
  userId: string;
}
