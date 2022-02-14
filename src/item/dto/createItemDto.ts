import { IsString, IsNotEmpty, Matches, IsBoolean } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}/)
  groupId: string;
}
