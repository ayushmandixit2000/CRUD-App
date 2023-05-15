import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
  @UsePipes(ValidationPipe)
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() feedComment: CommentDto,
  ): Observable<UpdateResult> {
    return this.commentsService.updateComment(id, feedComment);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  delete( @Param('id',ParseIntPipe) id: number): Observable<DeleteResult> { //add validation here to ensure app does not fail when delete is called
    return this.commentsService.deleteComment(id);
  }
}
