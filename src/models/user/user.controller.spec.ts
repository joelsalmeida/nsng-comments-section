import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const CREATE_SUCCESS_MESSAGE = 'User created successfully';
const CREATE_PARAM = {
  username: 'my-username',
};

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
});
