import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class RequestParams {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}/)
  userId: string;
}
