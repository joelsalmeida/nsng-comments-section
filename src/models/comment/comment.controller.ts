import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikeCommentDto } from './dto/like-comment.dto';
import { PatchCommentDto } from './dto/patch-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      await this.commentService.create(createCommentDto);

      return {
        success: true,
        message: 'Comment posted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('like')
  async like(@Body() likeCommentDto: LikeCommentDto) {
    try {
      const data = await this.commentService.like(likeCommentDto);

      return {
        success: true,
        message: data,
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
    @Body() updateCommentDto: PatchCommentDto,
  ) {
    try {
      const data = await this.commentService.patch(id, updateCommentDto);

      if (!data) {
        return {
          success: false,
          message: `Comment not found with id: ${id}`,
        };
      }

      return {
        success: true,
        message: 'Comment patched successfully',
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get('timeline')
  async timeline() {
    try {
      const data = await this.commentService.timeline();

      return {
        success: true,
        message: 'Comments timeline fetched Successfully',
        data: data,
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
      const data = await this.commentService.findOne(id);

      return {
        success: true,
        message: 'Comment fetched successfully',
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
      const data = await this.commentService.findAll();

      return {
        success: true,
        message: 'Comments fetched Successfully',
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
      await this.commentService.remove(id);

      return {
        success: true,
        message: 'Comment removed successfully',
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
