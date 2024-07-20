import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Response } from './response.entity';
import { ResponseService } from './response.service';

describe('ResponseService', () => {
  let responseService: ResponseService;
  let responseRepository: Repository<Response>;

  beforeEach(async () => {
    const mockResponseRepository = {
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
        ResponseService,
        {
          provide: 'ResponseRepository',
          useValue: mockResponseRepository,
        },
      ],
    }).compile();

    responseService = moduleRef.get<ResponseService>(ResponseService);
    responseRepository = moduleRef.get<Repository<Response>>(
      getRepositoryToken(Response),
    );
  });

  describe('create', () => {
    const responseData = {
      comment: 'comment-id',
      sender: 'sender-id',
      recipient: 'recipient-id',
      body: 'response body',
    };

    it('should call responseRepository.create with createResponseDto', async () => {
      jest
        .spyOn(responseRepository, 'save')
        .mockResolvedValue(responseData as Response);

      await responseService.create(responseData);

      expect(responseRepository.create).toHaveBeenCalledWith(responseData);
    });

    it('should call responseRepository.save with likes atribute', async () => {
      jest
        .spyOn(responseRepository, 'save')
        .mockResolvedValue(responseData as Response);

      await responseService.create(responseData);

      expect(responseRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ likes: [] }),
      );
    });

    it('should return responseRepository.save data', async () => {
      jest
        .spyOn(responseRepository, 'save')
        .mockResolvedValue(responseData as Response);

      const result = await responseService.create(responseData);

      expect(result).toEqual(responseData);
    });
  });

  describe('patch', () => {
    const responseId = 'test-id';
    const response = { id: responseId, body: 'response body' };

    it('should call responseRepository.findOneBy with id property', async () => {
      jest
        .spyOn(responseRepository, 'findOneBy')
        .mockResolvedValue(response as Response);

      await responseService.patch('test-id', { body: 'patched body' });

      expect(responseRepository.findOneBy).toHaveBeenCalledWith({
        id: responseId,
      });

      expect(responseRepository.findOneBy).toHaveBeenCalledTimes(2);
    });

    it('should return responseRepository.findOneBy data', async () => {
      jest
        .spyOn(responseRepository, 'findOneBy')
        .mockResolvedValue(response as Response);

      const result = await responseService.patch('test-id', {
        body: 'patched body',
      });

      expect(result).toEqual(response);
    });
  });

  describe('findOne', () => {
    const responseId = 'test-id';
    const response = { id: responseId, body: 'response body' };

    it('should call responseRepository.findOneBy with id property', async () => {
      jest
        .spyOn(responseRepository, 'findOneBy')
        .mockResolvedValue(response as Response);

      await responseService.findOne('test-id');

      expect(responseRepository.findOneBy).toHaveBeenCalledWith({
        id: responseId,
      });
    });

    it('should return responseRepository.findOneBy data', async () => {
      jest
        .spyOn(responseRepository, 'findOneBy')
        .mockResolvedValue(response as Response);

      const result = await responseService.findOne('test-id');

      expect(result).toEqual(response);
    });
  });

  describe('findAll', () => {
    const data = [{ sender: 'find-all-sender-id', body: 'find all' }];

    it('should call responseRepository.find', async () => {
      jest
        .spyOn(responseRepository, 'find')
        .mockResolvedValue(data as Response[]);

      await responseService.findAll();

      expect(responseRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return responseRepository.find data', async () => {
      jest
        .spyOn(responseRepository, 'find')
        .mockResolvedValue(data as Response[]);

      const result = await responseService.findAll();

      expect(result).toEqual(data);
    });
  });

  describe('findByCommentId', () => {
    const commentId = 'test-id';
    const expectedResult = [{ id: 'query-builder-id', likes: ['some-id'] }];

    it('should return responseRepository query data', async () => {
      const result = await responseService.findByCommentId(commentId);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('like', () => {
    const sender = 'some-id';

    it('if already liked, should return liked false with response id', async () => {
      const result = await responseService.like({
        sender,
        response: 'query-builder-id',
      });

      expect(result).toEqual({ id: 'query-builder-id', liked: false });
    });

    it('if not liked, should return liked true with response id', async () => {
      const result = await responseService.like({
        sender: 'not-found-id',
        response: 'query-builder-id',
      });

      expect(result).toEqual({ id: 'query-builder-id', liked: true });
    });

    it('should return "not found error" if repository returns null', async () => {
      jest.spyOn(responseRepository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      } as any);

      const likeResponseDto = {
        sender: 'not-found-id',
        response: 'query-builder-id',
      };

      await expect(responseService.like(likeResponseDto)).rejects.toThrow(
        'Response not found',
      );
    });
  });

  describe('remove', () => {
    const responseId = 'test-id';
    const response = {
      id: responseId,
      sender: 'remove-sender-id',
      body: 'remove',
    };

    it('should call responseRepository.findOneBy with id property', async () => {
      jest
        .spyOn(responseRepository, 'findOneBy')
        .mockResolvedValue(response as Response);

      await responseService.remove(responseId);

      expect(responseRepository.findOneBy).toHaveBeenCalledWith({
        id: responseId,
      });
    });

    it('should return null, if response not found (repository return null)', async () => {
      jest.spyOn(responseRepository, 'findOneBy').mockResolvedValue(null);

      const result = await responseService.remove(responseId);

      expect(result).toEqual(null);
    });

    it('should return "removed:true and id" on success', async () => {
      jest
        .spyOn(responseRepository, 'findOneBy')
        .mockResolvedValue(response as Response);

      const result = await responseService.remove('test-id');

      expect(result).toEqual({ id: response.id, removed: true });
    });
  });
});
