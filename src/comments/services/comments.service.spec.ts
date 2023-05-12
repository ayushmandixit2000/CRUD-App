import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedCommentEntity } from '../models/comment.entity';
import { FeedPostEntity } from '../../feed/models/post.entity';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepository: Repository<FeedCommentEntity>;
  let postRepository: Repository<FeedPostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<Repository<FeedCommentEntity>>(
      getRepositoryToken(FeedCommentEntity)
    );
    postRepository = module.get<Repository<FeedPostEntity>>(
      getRepositoryToken(FeedPostEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Additional tests...

});
