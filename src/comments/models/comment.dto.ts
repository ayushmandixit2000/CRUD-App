import { IsInt, IsNotEmpty, Length, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
import { FeedPostEntity } from "../../feed/models/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedCommentEntity } from "./comment.entity";

export class CommentDto {
    id?: number;
    
    @IsNotEmpty({message: 'Comment needs to have a post id'})
    @IsInt()
    postid?: number;

    @Length(3)
    text?: string;

    createdAt?: Date;
}




  