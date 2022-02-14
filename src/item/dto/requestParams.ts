import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class groupParam {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}/)
  groupId: string;
}

export class itemParam {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}/)
  itemId: string;
}
