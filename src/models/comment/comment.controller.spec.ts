import { Test } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

const CREATE_SUCCESS_MESSAGE = 'Comment posted successfully';
const FIND_ALL_SUCCESS_MESSAGE = 'Comments fetched Successfully';

const CREATE_PARAM = {
  sender: 'sender-id',
  body: 'comment body',
};

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
});
