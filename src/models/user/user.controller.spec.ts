import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const FIND_ONE_ID_PARAM = 'find-one-user-id';

const CREATE_SUCCESS_MESSAGE = 'User created successfully';
const CREATE_PARAM = {
  username: 'my-username',
};
const FIND_ONE_SUCCESS_MESSAGE = 'User fetched successfully';
const FIND_ONE_NOT_FOUND_MESSAGE = `User not found with id: ${FIND_ONE_ID_PARAM}`;

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const mockUserRepository = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: 'UserRepository', useValue: mockUserRepository },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('create', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockUserServiceReturnedData = {
        username: 'nice-username',
        id: 'nice-id',
      };

      jest
        .spyOn(userService, 'create')
        .mockImplementation(async () => mockUserServiceReturnedData);

      const expectedResult = {
        success: true,
        message: CREATE_SUCCESS_MESSAGE,
        data: mockUserServiceReturnedData,
      };

      expect(await userController.create(CREATE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(userService, 'create').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await userController.create(CREATE_PARAM)).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('findOne', () => {
    it('on success, should return "success: true, success message and service data"', async () => {
      const mockCommentServiceReturnedData = {
        username: 'find-username',
        id: 'find-id',
      };

      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: true,
        message: FIND_ONE_SUCCESS_MESSAGE,
        data: mockCommentServiceReturnedData,
      };

      expect(await userController.findOne('comment-id')).toStrictEqual(
        expectedResult,
      );
    });

    it('if user not found (service return null), should return "success: false and error message with id"', async () => {
      const mockCommentServiceReturnedData = null;

      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => mockCommentServiceReturnedData);

      const expectedResult = {
        success: false,
        message: FIND_ONE_NOT_FOUND_MESSAGE,
      };

      expect(await userController.findOne(FIND_ONE_ID_PARAM)).toStrictEqual(
        expectedResult,
      );
    });

    it('on error, should return "success: false and error message"', async () => {
      const mockCommentServiceReturnedData = new Error('Internal Server Error');

      jest.spyOn(userService, 'findOne').mockImplementation(async () => {
        throw mockCommentServiceReturnedData;
      });

      const expectedResult = {
        success: false,
        message: mockCommentServiceReturnedData.message,
      };

      expect(await userController.findOne('comment-id')).toStrictEqual(
        expectedResult,
      );
    });
  });
});
