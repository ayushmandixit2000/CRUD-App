import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { CommentsService } from '../../comments/services/comments.service';
@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
    private readonly commentsService: CommentsService, // Inject CommentsService
  ) {}

  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  async deletePost(id: number): Promise<DeleteResult> {
    // Delete comments associated with the post
    await this.commentsService.deleteCommentsByPostId(id);

    // Delete the post
    return this.feedPostRepository.delete(id);
  }
}
