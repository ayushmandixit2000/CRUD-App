import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedCommentEntity } from './models/comment.entity';
import { FeedService } from 'src/feed/services/feed.service';
import { FeedPostEntity } from 'src/feed/models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedCommentEntity]), TypeOrmModule.forFeature([FeedPostEntity])],
  providers: [CommentsService, FeedService],
  controllers: [CommentsController]
})
export class CommentsModule {}

