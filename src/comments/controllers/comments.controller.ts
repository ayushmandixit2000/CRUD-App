import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { FeedComment } from '../models/comment.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CommentDto } from '../models/comment.dto';


@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() feedComment: CommentDto): Observable<CommentDto> {
    return this.commentsService.createComment(feedComment);
  }

  @Get()
  findAll(): Observable<FeedComment[]> {
    return this.commentsService.findAllComments();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedComment: FeedComment,
  ): Observable<UpdateResult> {
    return this.commentsService.updateComment(id, feedComment);
  }


  @Delete(':id')
  delete( @Param('id') id: number): Observable<DeleteResult> {
    return this.commentsService.deleteComment(id);
  }
}
