import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedDto } from '../models/feed.dto';
@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() feedPost: FeedDto): Observable<FeedDto> {
    return this.feedService.createPost(feedPost);
  }

  @Get()
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPosts();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  delete( @Param('id',ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}

