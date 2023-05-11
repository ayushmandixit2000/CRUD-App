import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedCommentEntity } from '../models/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedComment } from '../models/comment.interface';
import { Observable, from, switchMap } from 'rxjs';
import { FeedPostEntity } from 'src/feed/models/post.entity';
import { throwError } from 'rxjs';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(FeedCommentEntity)
        private readonly feedCommentRepository: Repository<FeedCommentEntity>,
        @InjectRepository(FeedPostEntity)
        private readonly feedRepository: Repository<FeedPostEntity>,
      ) {}
    
      createComment(feedComment: FeedComment): Observable<FeedComment> {
        // Check if postid exists in FeedPostEntity
        return from(this.feedRepository.findOne({ where: { id: feedComment.postid } })).pipe(
            switchMap((result) => {
                if (!result) {
                    // Postid doesn't exist in FeedPostEntity
                    return throwError('Postid does not exist in FeedPostEntity');
                }
                return from(this.feedCommentRepository.save(feedComment));
            }),
        );
    }
    
      findAllComments(): Observable<FeedComment[]> {
        return from(this.feedCommentRepository.find());
      }
    
      updateComment(id: number, feedComment: FeedComment): Observable<UpdateResult> {
        // Exclude postId from the update
        const { postid, ...updatedFields } = feedComment;
        return from(this.feedCommentRepository.update(id, updatedFields));
      }
    
      deleteComment(id: number): Observable<DeleteResult>{
        return from(this.feedCommentRepository.delete(id));
      }

      async deleteCommentsByPostId(postid: number): Promise<DeleteResult> {
        return this.feedCommentRepository
          .createQueryBuilder()
          .delete()
          .where('postid = :postid', { postid })
          .execute();
      }
      
}
