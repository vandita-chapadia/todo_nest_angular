import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class userRegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
