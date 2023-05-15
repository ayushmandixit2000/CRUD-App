import { IsNotEmpty, Length, isNotEmpty } from 'class-validator';

export class FeedDto {
  id?: number;

  @IsNotEmpty({message: 'Feed needs to have a title'})
  title?: string;

  @Length(5) //at least 5 characters long
  body?: string;

  createdAt?: Date;
}
