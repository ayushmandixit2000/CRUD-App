import { IsNotEmpty, Length } from "class-validator";

export class CommentDto {
    id?: number;
    
    @IsNotEmpty({message: 'Comment needs to have a post id'})
    postid?: number;

    @Length(3)
    text?: string;

    createdAt?: Date;
}