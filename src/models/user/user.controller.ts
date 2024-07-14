import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.userService.create(createUserDto);

      return {
        success: true,
        message: 'User created successfully',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.userService.findAll();

      return {
        success: true,
        message: 'Users fetched Successfully',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(id);

      if (!data) {
        return {
          success: false,
          message: `User not found with id: ${id}`,
        };
      }

      return {
        success: true,
        message: 'User fetched successfully',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(id);

      return {
        success: true,
        message: 'User removed successfully',
        data: id,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
