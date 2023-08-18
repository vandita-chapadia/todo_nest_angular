import { IsNotEmpty, MaxLength } from 'class-validator';

export class createTodo {
  @IsNotEmpty()
  @MaxLength(15, { message: 'max length of the title would be 15 character' })
  title: string;

  @IsNotEmpty()
  description: string;
}
