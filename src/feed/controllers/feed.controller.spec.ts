import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from '../services/feed.service';
import { CommentsService } from '../../comments/services/comments.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedCommentEntity } from '../../comments/models/comment.entity';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';
import { Observable, of } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('FeedController', () => {
  let feedController: FeedController;
  let feedService: FeedService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        FeedService,
        CommentsService, // Add CommentsService to providers
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

    feedController = moduleRef.get<FeedController>(FeedController);
    feedService = moduleRef.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(feedController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', (done) => {
      const mockPost: FeedPost = { title: 'Test post', body: 'Test content' };
      jest.spyOn(feedService, 'createPost').mockReturnValue(of(mockPost));

      const result: Observable<FeedPost> = feedController.create(mockPost);

      result.subscribe((createdPost) => {
        expect(createdPost).toEqual(mockPost);
        done();
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', (done) => {
      const mockPosts: FeedPost[] = [
        { title: 'Test post 1', body: 'Test content 1' },
        { title: 'Test post 2', body: 'Test content 2' },
      ];
      jest
        .spyOn(feedService, 'findAllPosts')
        .mockReturnValue(of(mockPosts));

      const result: Observable<FeedPost[]> = feedController.findAll();

      result.subscribe((posts) => {
        expect(posts).toEqual(mockPosts);
        done();
      });
    });
  });


  describe('update', () => {
    it('should update a post', (done) => {
      const postId = 1;
      const mockPost: FeedPost = { title: 'Updated post', body: 'Updated content' };
      jest
        .spyOn(feedService, 'updatePost')
        .mockReturnValue(of({} as UpdateResult));

      const result: Observable<UpdateResult> = feedController.update(
        postId,
        mockPost,
      );

      result.subscribe((updateResult) => {
        expect(updateResult).toEqual({} as UpdateResult);
        done();
      });
    });
  });

  describe('delete', () => {
    it('should delete a post', async () => {
      const postId = 1;
      const deleteResult: DeleteResult = { affected: 1, raw: {} } as DeleteResult;
      jest
        .spyOn(feedService, 'deletePost')
        .mockResolvedValue(deleteResult);

      const result: Promise<DeleteResult> = feedController.delete(postId);

      await expect(result).resolves.toEqual(deleteResult);
    });
  });

});
