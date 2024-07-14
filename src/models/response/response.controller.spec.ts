import { Test } from '@nestjs/testing';
import { ResponseController } from './response.controller';
import { Response } from './response.entity';
import { ResponseService } from './response.service';

const CREATE_PARAM = {
  comment: 'comment-id',
  sender: 'sender-id',
  recipient: 'recipient-id',
  body: 'response body',
};
const LIKE_PARAM = { sender: 'sender-id', response: 'response-id' };
const PATCH_ID_PARAM = 'patch-response-id';
const FIND_ONE_ID_PARAM = 'find-one-response-id';
const REMOVE_ID_PARAM = 'remove-response-id';
const PATCH_PARAM = { body: 'new response body' };

const CREATE_SUCCESS_MESSAGE = 'Response posted successfully';
const FIND_ONE_SUCCESS_MESSAGE = 'Response fetched successfully';
const FIND_ALL_SUCCESS_MESSAGE = 'Responses fetched successfully';
const LIKED_SUCCESS_MESSAGE = 'Response liked successfully';
const UNLED_SUCCESS_MESSAGE = 'Response "unliked" successfully';
const PATCH_SUCCESS_MESSAGE = 'Response patched successfully';
const PATCH_NOT_FOUND_MESSAGE = `Response not found with id: ${PATCH_ID_PARAM}`;
const FIND_ONE_NOT_FOUND_MESSAGE = `Response not found with id: ${FIND_ONE_ID_PARAM}`;
const REMOVE_NOT_FOUND_MESSAGE = `Response not found with id: ${REMOVE_ID_PARAM}`;
const REMOVE_SUCCESS_MESSAGE = 'Response removed successfully';

describe('ResponseController', () => {
  let responseController: ResponseController;
  let responseService: ResponseService;

  beforeEach(async () => {
    const mockResponseRepository = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [ResponseController],
      providers: [
        ResponseService,
        { provide: 'ResponseRepository', useValue: mockResponseRepository },
      ],
    }).compile();

    responseService = moduleRef.get<ResponseService>(ResponseService);
    responseController = moduleRef.get<ResponseController>(ResponseController);
  });

  describe('create', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockResponseServiceReturnedData = {
        sender: 'sender-id',
        body: 'response body',
        likes: [],
      };

      jest
        .spyOn(responseService, 'create')
        .mockImplementation(
          async () => mockResponseServiceReturnedData as Response,
        );

      const expectedResult = {
        success: true,
        message: CREATE_SUCCESS_MESSAGE,
        data: mockResponseServiceReturnedData,
      };

      expect(await responseController.create(CREATE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockResponseServiceReturnedData = new Error(
        'Internal Server Error',
      );

      jest.spyOn(responseService, 'create').mockImplementation(async () => {
        throw mockResponseServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockResponseServiceReturnedData.message,
      };

      expect(await responseController.create(CREATE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('patch', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockResponseServiceReturnedData = {
        sender: 'sender-id',
        body: 'response body',
        likes: [],
      };

      jest
        .spyOn(responseService, 'patch')
        .mockImplementation(
          async () => mockResponseServiceReturnedData as Response,
        );

      const expectedResult = {
        success: true,
        message: PATCH_SUCCESS_MESSAGE,
        data: mockResponseServiceReturnedData,
      };

      expect(
        await responseController.patch('response-id', PATCH_PARAM),
      ).toStrictEqual(expectedResult);
    });

    it('if response not found (service return null), should return "success: false and error message with id"', async () => {
      const mockResponseServiceReturnedData = null;

      jest
        .spyOn(responseService, 'patch')
        .mockImplementation(async () => mockResponseServiceReturnedData);

      const expectedResult = {
        success: false,
        message: PATCH_NOT_FOUND_MESSAGE,
      };

      expect(
        await responseController.patch(PATCH_ID_PARAM, PATCH_PARAM),
      ).toStrictEqual(expectedResult);
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockResponseServiceReturnedData = new Error(
        'Internal Server Error',
      );

      jest.spyOn(responseService, 'patch').mockImplementation(async () => {
        throw mockResponseServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockResponseServiceReturnedData.message,
      };

      expect(
        await responseController.patch('response-id', PATCH_PARAM),
      ).toStrictEqual(expectedResult);
    });
  });

  describe('like', () => {
    it('if not liked, on success, should return "success: true, success liked message and service data"', async () => {
      const mockResponseServiceReturnedData = {
        id: '53720692-21b2-4254-9e1c-2b50ddfb3ad5',
        liked: true,
      };

      jest
        .spyOn(responseService, 'like')
        .mockImplementation(async () => mockResponseServiceReturnedData);

      const expectedResult = {
        success: true,
        message: LIKED_SUCCESS_MESSAGE,
        data: mockResponseServiceReturnedData,
      };

      expect(await responseController.like(LIKE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('if already liked, on success, should return "success: true, success unliked message and service data"', async () => {
      const mockResponseServiceReturnedData = {
        id: '53720692-21b2-4254-9e1c-2b50ddfb3ad5',
        liked: false,
      };

      jest
        .spyOn(responseService, 'like')
        .mockImplementation(async () => mockResponseServiceReturnedData);

      const expectedResult = {
        success: true,
        message: UNLED_SUCCESS_MESSAGE,
        data: mockResponseServiceReturnedData,
      };

      expect(await responseController.like(LIKE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockResponseServiceReturnedData = new Error(
        'Internal Server Error',
      );

      jest.spyOn(responseService, 'like').mockImplementation(async () => {
        throw mockResponseServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockResponseServiceReturnedData.message,
      };

      expect(await responseController.like(LIKE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('findOne', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockResponseServiceReturnedData = {
        sender: 'sender-id',
        body: 'response body',
        likes: [],
      };

      jest
        .spyOn(responseService, 'findOne')
        .mockImplementation(
          async () => mockResponseServiceReturnedData as Response,
        );

      const expectedResult = {
        success: true,
        message: FIND_ONE_SUCCESS_MESSAGE,
        data: mockResponseServiceReturnedData,
      };

      expect(await responseController.findOne('response-id')).toStrictEqual(
        expectedResult,
      );
    });

    it('if response not found (service return null), should return "success: false and error message with id"', async () => {
      const mockResponseServiceReturnedData = null;

      jest
        .spyOn(responseService, 'findOne')
        .mockImplementation(async () => mockResponseServiceReturnedData);

      const expectedResult = {
        success: false,
        message: FIND_ONE_NOT_FOUND_MESSAGE,
      };

      expect(await responseController.findOne(FIND_ONE_ID_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockResponseServiceReturnedData = new Error(
        'Internal Server Error',
      );

      jest.spyOn(responseService, 'findOne').mockImplementation(async () => {
        throw mockResponseServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockResponseServiceReturnedData.message,
      };

      expect(await responseController.findOne('response-id')).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('findAll', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockResponseServiceReturnedData = [];

      jest
        .spyOn(responseService, 'findAll')
        .mockImplementation(async () => mockResponseServiceReturnedData);

      const expectedResult = {
        success: true,
        message: FIND_ALL_SUCCESS_MESSAGE,
        data: mockResponseServiceReturnedData,
      };

      expect(await responseController.findAll()).toStrictEqual(expectedResult);
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockResponseServiceReturnedData = new Error(
        'Internal Server Error',
      );

      jest.spyOn(responseService, 'findAll').mockImplementation(async () => {
        throw mockResponseServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockResponseServiceReturnedData.message,
      };

      expect(await responseController.findAll()).toStrictEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockResponseServiceReturnedData = {
        id: REMOVE_ID_PARAM,
        removed: true,
      };

      jest
        .spyOn(responseService, 'remove')
        .mockImplementation(async () => mockResponseServiceReturnedData);

      const expectedResult = {
        success: true,
        message: REMOVE_SUCCESS_MESSAGE,
        data: mockResponseServiceReturnedData,
      };

      expect(await responseController.remove(REMOVE_ID_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('if response not found (service return null), should return "success: false and error message with id"', async () => {
      const mockResponseServiceReturnedData = null;

      jest
        .spyOn(responseService, 'remove')
        .mockImplementation(async () => mockResponseServiceReturnedData);

      const expectedResult = {
        success: false,
        message: REMOVE_NOT_FOUND_MESSAGE,
      };

      expect(await responseController.remove(REMOVE_ID_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockResponseServiceReturnedData = new Error(
        'Internal Server Error',
      );

      jest.spyOn(responseService, 'remove').mockImplementation(async () => {
        throw mockResponseServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockResponseServiceReturnedData.message,
      };

      expect(await responseController.remove('response-id')).toStrictEqual(
        expectedResult,
      );
    });
  });
});
