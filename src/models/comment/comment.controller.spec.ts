import { Test } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

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

  describe('findAll', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = [];

      jest
        .spyOn(commentService, 'findAll')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const result = {
        success: true,
        message: 'Comments fetched Successfully',
        data: mockCommentServiceReturnedData,
      };

      expect(await commentController.findAll()).toStrictEqual(result);
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(commentService, 'findAll').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const result = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await commentController.findAll()).toStrictEqual(result);
    });
  });
});
