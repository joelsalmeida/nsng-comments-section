import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const mockUserRepository = {
      save: jest.fn().mockReturnValue({}),
      create: jest.fn().mockReturnValue({}),
      find: jest.fn().mockReturnValue([]),
      findOneBy: jest.fn().mockReturnValue({}),
      findOne: jest.fn().mockReturnValue({}),
      delete: jest.fn().mockReturnValue({}),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    const userData = { username: 'test-username', id: 'test-id' };

    it('should call userRepository.create with createUserDto', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue(userData);

      await userService.create(userData);

      expect(userRepository.create).toHaveBeenCalledWith(userData);
    });

    it('should return userRepository.save data', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue(userData);

      const result = await userService.create(userData);

      expect(result).toEqual(userData);
    });
  });

  describe('findOne', () => {
    const userId = 'test-id';
    const user = { username: 'test-username', id: userId };

    it('should call userRepository.findOneBy with id property', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      await userService.findOne('test-id');

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    });

    it('should return userRepository.findOneBy data', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const result = await userService.findOne('test-id');

      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    const data = [{ id: 'find-all-id', username: 'find-all-username' }];

    it('should call userRepository.find', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(data);

      await userService.findAll();

      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return userRepository.find data', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(data);

      const result = await userService.findAll();

      expect(result).toEqual(data);
    });
  });

  describe('remove', () => {
    const userId = 'test-id';
    const user = { username: 'test-username', id: userId };

    it('should call userRepository.findOne with id property', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      await userService.remove('test-id');

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    });

    it('should return null, if user not found (repository return null)', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

      const result = await userService.remove('test-id');

      expect(result).toEqual(null);
    });

    it('should return "removed:true and id"', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const result = await userService.remove('test-id');

      expect(result).toEqual({ id: user.id, removed: true });
    });
  });
});
