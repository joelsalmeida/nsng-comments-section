import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { ResponseService } from './response.service';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  async create(@Body() createResponseDto: CreateResponseDto) {
    try {
      await this.responseService.create(createResponseDto);

      return {
        success: true,
        message: 'Response posted successfully',
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
        message: 'Responses fetched Successfully',
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
      await this.responseService.remove(id);

      return {
        success: true,
        message: 'Response removed successfully',
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
