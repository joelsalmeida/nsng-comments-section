import { Test } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

const CREATE_PARAM = {
  sender: 'sender-id',
  body: 'comment body',
};
const LIKE_PARAM = { sender: 'sender-id', comment: 'comment-id' };
const PATCH_ID_PARAM = 'patch-comment-id';
const FIND_ONE_ID_PARAM = 'find-one-comment-id';
const REMOVE_ID_PARAM = 'remove-comment-id';
const PATCH_PARAM = { body: 'new comment body' };

const CREATE_SUCCESS_MESSAGE = 'Comment posted successfully';
const FIND_ONE_SUCCESS_MESSAGE = 'Comment fetched successfully';
const FIND_ALL_SUCCESS_MESSAGE = 'Comments fetched successfully';
const TIMELINE_SUCCESS_MESSAGE = 'Comments timeline fetched successfully';
const LIKED_SUCCESS_MESSAGE = 'Comment liked successfully';
const UNLED_SUCCESS_MESSAGE = 'Comment "unliked" successfully';
const PATCH_SUCCESS_MESSAGE = 'Comment patched successfully';
const PATCH_NOT_FOUND_MESSAGE = `Comment not found with id: ${PATCH_ID_PARAM}`;
const FIND_ONE_NOT_FOUND_MESSAGE = `Comment not found with id: ${FIND_ONE_ID_PARAM}`;
const REMOVE_NOT_FOUND_MESSAGE = `Comment not found with id: ${REMOVE_ID_PARAM}`;
const REMOVE_SUCCESS_MESSAGE = 'Comment removed successfully';

describe('CommentController', () => {
  let commentController: CommentController;
  let commentService: CommentService;

  beforeEach(async () => {
    const mockCommentRepository = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        { provide: 'CommentRepository', useValue: mockCommentRepository },
      ],
    }).compile();

    commentService = moduleRef.get<CommentService>(CommentService);
    commentController = moduleRef.get<CommentController>(CommentController);
  });

  describe('create', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = {
        sender: 'sender-id',
        body: 'comment body',
        likes: [],
      };

      jest
        .spyOn(commentService, 'create')
        .mockImplementation(
          async () => mockCommentServiceReturnedData as Comment,
        );

      const expectedResult = {
        success: true,
        message: CREATE_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.create(CREATE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'create').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await commentController.create(CREATE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('patch', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = {
        sender: 'sender-id',
        body: 'comment body',
        likes: [],
      };

      jest
        .spyOn(commentService, 'patch')
        .mockImplementation(
          async () => mockCommentServiceReturnedData as Comment,
        );

      const expectedResult = {
        success: true,
        message: PATCH_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(
        await commentController.patch('comment-id', PATCH_PARAM),
      ).toStrictEqual(expectedResult);
    });

    it('if comment not found (service return null), should return "success: false and error message with id"', async () => {
      const mockCommentServiceReturnedData = null;

      jest
        .spyOn(commentService, 'patch')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: false,
        message: PATCH_NOT_FOUND_MESSAGE,
      };

      expect(
        await commentController.patch(PATCH_ID_PARAM, PATCH_PARAM),
      ).toStrictEqual(expectedResult);
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'patch').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(
        await commentController.patch('comment-id', PATCH_PARAM),
      ).toStrictEqual(expectedResult);
    });
  });

  describe('like', () => {
    it('if not liked, on success, should return "success: true, success liked message and service data"', async () => {
      const mockCommentServiceReturnedData = {
        id: '53720692-21b2-4254-9e1c-2b50ddfb3ad5',
        liked: true,
      };

      jest
        .spyOn(commentService, 'like')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: true,
        message: LIKED_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.like(LIKE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('if already liked, on success, should return "success: true, success unliked message and service data"', async () => {
      const mockCommentServiceReturnedData = {
        id: '53720692-21b2-4254-9e1c-2b50ddfb3ad5',
        liked: false,
      };

      jest
        .spyOn(commentService, 'like')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: true,
        message: UNLED_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.like(LIKE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'like').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await commentController.like(LIKE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('findOne', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = {
        sender: 'sender-id',
        body: 'comment body',
        likes: [],
      };

      jest
        .spyOn(commentService, 'findOne')
        .mockImplementation(
          async () => mockCommentServiceReturnedData as Comment,
        );

      const expectedResult = {
        success: true,
        message: FIND_ONE_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.findOne('comment-id')).toStrictEqual(
        expectedResult,
      );
    });

    it('if comment not found (service return null), should return "success: false and error message with id"', async () => {
      const mockCommentServiceReturnedData = null;

      jest
        .spyOn(commentService, 'findOne')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: false,
        message: FIND_ONE_NOT_FOUND_MESSAGE,
      };

      expect(await commentController.findOne(FIND_ONE_ID_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'findOne').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await commentController.findOne('comment-id')).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('findAll', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = [];

      jest
        .spyOn(commentService, 'findAll')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: true,
        message: FIND_ALL_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.findAll()).toStrictEqual(expectedResult);
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'findAll').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await commentController.findAll()).toStrictEqual(expectedResult);
    });
  });

  describe('timeline', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = [
        {
          sender: 'sender-id',
          body: 'comment body',
          likes: [],
        },
      ];

      jest
        .spyOn(commentService, 'timeline')
        .mockImplementation(
          async () => mockCommentServiceReturnedData as Comment[],
        );

      const expectedResult = {
        success: true,
        message: TIMELINE_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.timeline()).toStrictEqual(expectedResult);
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'timeline').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await commentController.timeline()).toStrictEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = {
        id: REMOVE_ID_PARAM,
        removed: true,
      };

      jest
        .spyOn(commentService, 'remove')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: true,
        message: REMOVE_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.remove(REMOVE_ID_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('if comment not found (service return null), should return "success: false and error message with id"', async () => {
      const mockCommentServiceReturnedData = null;

      jest
        .spyOn(commentService, 'remove')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: false,
        message: REMOVE_NOT_FOUND_MESSAGE,
      };

      expect(await commentController.remove(REMOVE_ID_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'remove').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await commentController.remove('comment-id')).toStrictEqual(
        expectedResult,
      );
    });
  });
});
