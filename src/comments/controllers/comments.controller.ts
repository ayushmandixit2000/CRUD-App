import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { FeedComment } from '../models/comment.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';


@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

  @Post()
  create(@Body() feedComment: FeedComment): Observable<FeedComment> {
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
