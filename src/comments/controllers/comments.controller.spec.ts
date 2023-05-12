import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from '../services/comments.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedCommentEntity } from '../models/comment.entity';
import { FeedPostEntity } from '../../feed/models/post.entity';
import { FeedComment } from '../models/comment.interface';
import { Observable, of } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(FeedCommentEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FeedPostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    commentsController = moduleRef.get<CommentsController>(CommentsController);
    commentsService = moduleRef.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(commentsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comment', (done) => {
      // Add done parameter for async test
      const mockComment: FeedComment = { postid: 9, text: 'Test comment' };
      jest
        .spyOn(commentsService, 'createComment')
        .mockReturnValue(of(mockComment));

      const result: Observable<FeedComment> =
        commentsController.create(mockComment);

      result.subscribe((createdComment) => {
        expect(createdComment).toEqual(mockComment); // Check emitted value
        done(); // Call done() to signal test completion
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of comments', (done) => {
      const mockComments: FeedComment[] = [
        { postid: 9, text: 'Test comment 1' },
        { postid: 9, text: 'Test comment 2' },
      ];
      jest
        .spyOn(commentsService, 'findAllComments')
        .mockReturnValue(of(mockComments));

      const result: Observable<FeedComment[]> = commentsController.findAll();

      result.subscribe((comments) => {
        expect(comments).toEqual(mockComments);
        done();
      });
    });
  });

  describe('update', () => {
    it('should update a comment', (done) => {
      const commentId = 1;
      const mockComment: FeedComment = { postid: 9, text: 'Updated comment' };
      jest
        .spyOn(commentsService, 'updateComment')
        .mockReturnValue(of({} as UpdateResult));

      const result: Observable<UpdateResult> = commentsController.update(
        commentId,
        mockComment,
      );

      result.subscribe((updateResult) => {
        expect(updateResult).toEqual({} as UpdateResult);
        done();
      });
    });
  });

  describe('delete', () => {
    it('should delete a comment', (done) => {
      const commentId = 1;
      jest
        .spyOn(commentsService, 'deleteComment')
        .mockReturnValue(of({} as DeleteResult));

      const result: Observable<DeleteResult> =
        commentsController.delete(commentId);

      result.subscribe((deleteResult) => {
        expect(deleteResult).toEqual({} as DeleteResult);
        done();
      });
    });
  });

  // Additional tests...
});
