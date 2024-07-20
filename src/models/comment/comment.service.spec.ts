import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let commentService: CommentService;
  let commentRepository: Repository<Comment>;

  beforeEach(async () => {
    const mockCommentRepository = {
      create: jest.fn().mockReturnValue({}),
      update: jest.fn().mockReturnValue({ affected: 1 } as UpdateResult),
      find: jest.fn().mockReturnValue([]),
      findOneBy: jest.fn().mockReturnValue({}),
      findOne: jest.fn().mockReturnValue({}),
      save: jest.fn().mockReturnValue({}),
      delete: jest.fn().mockReturnValue({}),
      createQueryBuilder: jest.fn().mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        execute: jest.fn().mockReturnThis(),
        getMany: jest
          .fn()
          .mockReturnValue([{ id: 'query-builder-id', likes: ['some-id'] }]),
        getOne: jest
          .fn()
          .mockReturnValue({ id: 'query-builder-id', likes: ['some-id'] }),
      }),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: 'CommentRepository',
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    commentService = moduleRef.get<CommentService>(CommentService);
    commentRepository = moduleRef.get<Repository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  describe('create', () => {
    const commentData = { sender: 'sender-id', body: 'comment body' };

    it('should call commentRepository.create with createCommentDto', async () => {
      jest
        .spyOn(commentRepository, 'save')
        .mockResolvedValue(commentData as Comment);

      await commentService.create(commentData);

      expect(commentRepository.create).toHaveBeenCalledWith(commentData);
    });

    it('should call commentRepository.save with likes atribute', async () => {
      jest
        .spyOn(commentRepository, 'save')
        .mockResolvedValue(commentData as Comment);

      await commentService.create(commentData);

      expect(commentRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ likes: [] }),
      );
    });

    it('should return commentRepository.save data', async () => {
      jest
        .spyOn(commentRepository, 'save')
        .mockResolvedValue(commentData as Comment);

      const result = await commentService.create(commentData);

      expect(result).toEqual(commentData);
    });
  });

  describe('patch', () => {
    const commentId = 'test-id';
    const comment = { id: commentId, body: 'comment body' };

    it('should call commentRepository.findOneBy with id property', async () => {
      jest
        .spyOn(commentRepository, 'findOneBy')
        .mockResolvedValue(comment as Comment);

      await commentService.patch('test-id', { body: 'patched body' });

      expect(commentRepository.findOneBy).toHaveBeenCalledWith({
        id: commentId,
      });

      expect(commentRepository.findOneBy).toHaveBeenCalledTimes(2);
    });

    it('should return commentRepository.findOneBy data', async () => {
      jest
        .spyOn(commentRepository, 'findOneBy')
        .mockResolvedValue(comment as Comment);

      const result = await commentService.patch('test-id', {
        body: 'patched body',
      });

      expect(result).toEqual(comment);
    });
  });

  describe('findOne', () => {
    const commentId = 'test-id';
    const comment = { id: commentId, body: 'comment body' };

    it('should call commentRepository.findOneBy with id property', async () => {
      jest
        .spyOn(commentRepository, 'findOneBy')
        .mockResolvedValue(comment as Comment);

      await commentService.findOne('test-id');

      expect(commentRepository.findOneBy).toHaveBeenCalledWith({
        id: commentId,
      });
    });

    it('should return commentRepository.findOneBy data', async () => {
      jest
        .spyOn(commentRepository, 'findOneBy')
        .mockResolvedValue(comment as Comment);

      const result = await commentService.findOne('test-id');

      expect(result).toEqual(comment);
    });
  });

  describe('findAll', () => {
    const data = [{ sender: 'find-all-sender-id', body: 'find all' }];

    it('should call commentRepository.find', async () => {
      jest
        .spyOn(commentRepository, 'find')
        .mockResolvedValue(data as Comment[]);

      await commentService.findAll();

      expect(commentRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return commentRepository.find data', async () => {
      jest
        .spyOn(commentRepository, 'find')
        .mockResolvedValue(data as Comment[]);

      const result = await commentService.findAll();

      expect(result).toEqual(data);
    });
  });

  describe('findBySender', () => {
    const sender = 'test-id';
    const comment = [{ id: 'query-builder-id', likes: ['some-id'] }];

    it('should return commentRepository query data', async () => {
      const result = await commentService.findBySender(sender);

      expect(result).toEqual(comment);
    });
  });

  describe('timeline', () => {
    const expectedResult = [{ id: 'query-builder-id', likes: ['some-id'] }];

    it('should return commentRepository.findOneBy data', async () => {
      const result = await commentService.timeline();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('like', () => {
    const sender = 'some-id';

    it('if already liked, should return liked false with response id', async () => {
      const result = await commentService.like({
        sender,
        comment: 'query-builder-id',
      });

      expect(result).toEqual({ id: 'query-builder-id', liked: false });
    });

    it('if not liked, should return liked true', async () => {
      const result = await commentService.like({
        sender: 'not-found-id',
        comment: 'query-builder-id',
      });

      expect(result).toEqual({ id: 'query-builder-id', liked: true });
    });

    it('should return "not found error" if repository returns null', async () => {
      jest.spyOn(commentRepository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      } as any);

      const likeCommentDto = {
        sender: 'not-found-id',
        comment: 'query-builder-id',
      };

      await expect(commentService.like(likeCommentDto)).rejects.toThrow(
        'Comment not found',
      );
    });
  });

  describe('remove', () => {
    const commentId = 'test-id';
    const comment = {
      id: commentId,
      sender: 'remove-sender-id',
      body: 'remove',
    };

    it('should call commentRepository.findOneBy with id property', async () => {
      jest
        .spyOn(commentRepository, 'findOneBy')
        .mockResolvedValue(comment as Comment);

      await commentService.remove(commentId);

      expect(commentRepository.findOneBy).toHaveBeenCalledWith({
        id: commentId,
      });
    });

    it('should return null, if comment not found (repository return null)', async () => {
      jest.spyOn(commentRepository, 'findOneBy').mockResolvedValue(null);

      const result = await commentService.remove(commentId);

      expect(result).toEqual(null);
    });

    it('should return "removed:true and id" on success', async () => {
      jest
        .spyOn(commentRepository, 'findOneBy')
        .mockResolvedValue(comment as Comment);

      const result = await commentService.remove('test-id');

      expect(result).toEqual({ id: comment.id, removed: true });
    });
  });
});
