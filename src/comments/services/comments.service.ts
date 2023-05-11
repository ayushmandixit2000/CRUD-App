import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedCommentEntity } from '../models/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedComment } from '../models/comment.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(FeedCommentEntity)
        private readonly feedCommentRepository: Repository<FeedCommentEntity>,
      ) {}
    
      createComment(feedComment: FeedComment): Observable<FeedComment> {
        return from(this.feedCommentRepository.save(feedComment));
      }
    
      findAllComments(): Observable<FeedComment[]> {
        return from(this.feedCommentRepository.find());
      }
    
      updateComment(id: number, feedComment: FeedComment): Observable<UpdateResult> {
        return from(this.feedCommentRepository.update(id, feedComment));
      }
    
      deleteComment(id: number): Observable<DeleteResult>{
        return from(this.feedCommentRepository.delete(id));
      }
}
