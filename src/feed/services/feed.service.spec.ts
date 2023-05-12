import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from './feed.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { CommentsService } from '../../comments/services/comments.service';
import { FeedCommentEntity } from '../../comments/models/comment.entity';

describe('FeedService', () => {
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedService,
        CommentsService,
        {
          provide: getRepositoryToken(FeedPostEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FeedCommentEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


