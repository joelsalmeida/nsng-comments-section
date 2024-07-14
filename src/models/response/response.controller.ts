import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { LikeResponseDto } from './dto/like-response.dto';
import { PatchResponseDto } from './dto/patch-response.dto';
import { ResponseService } from './response.service';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  async create(@Body() createResponseDto: CreateResponseDto) {
    try {
      const data = await this.responseService.create(createResponseDto);

      return {
        success: true,
        message: 'Response posted successfully',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('like')
  async like(@Body() likeResponseDto: LikeResponseDto) {
    const MESSAGE_LIKED = {
      true: 'Response liked successfully',
      false: 'Response "unliked" successfully',
    };

    try {
      const data = await this.responseService.like(likeResponseDto);

      return {
        success: true,
        message: MESSAGE_LIKED[String(data.liked)],
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() patchResponseDto: PatchResponseDto,
  ) {
    try {
      const data = await this.responseService.patch(id, patchResponseDto);

      if (!data) {
        return {
          success: false,
          message: `Response not found with id: ${id}`,
        };
      }

      return {
        success: true,
        message: 'Response patched successfully',
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
      const data = await this.responseService.findOne(id);

      if (!data) {
        return {
          success: false,
          message: `Response not found with id: ${id}`,
        };
      }

      return {
        success: true,
        message: 'Response fetched successfully',
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
      const data = await this.responseService.findAll();

      return {
        success: true,
        message: 'Responses fetched successfully',
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
      const data = await this.responseService.remove(id);

      if (!data) {
        return {
          success: false,
          message: `Response not found with id: ${id}`,
        };
      }

      return {
        success: true,
        message: 'Response removed successfully',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
