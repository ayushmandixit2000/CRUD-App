import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedCommentEntity } from './models/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedCommentEntity])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}

