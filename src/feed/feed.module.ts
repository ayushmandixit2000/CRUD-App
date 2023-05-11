import { Module } from '@nestjs/common';
import { FeedService } from './services/feed.service';
import { FeedController } from './controllers/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedPostEntity } from './models/post.entity';
import { CommentsService } from 'src/comments/services/comments.service';
import { FeedCommentEntity } from 'src/comments/models/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedPostEntity]), TypeOrmModule.forFeature([FeedCommentEntity])],
  providers: [FeedService, CommentsService],
  controllers: [FeedController],
})
export class FeedModule {}
