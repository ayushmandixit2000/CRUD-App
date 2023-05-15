import { IsNotEmpty } from 'class-validator';

export class FeedComment {
    id?: number;
    
    @IsNotEmpty()
    postid?: number;

    @IsNotEmpty()
    text?: string;

    createdAt?: Date;
}