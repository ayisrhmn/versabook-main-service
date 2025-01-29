import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { BookDto } from './dto/book.dto';
import { BOOK_BODY } from 'src/constants/api-body';

@ApiTags('Book')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'API for create book' })
  @ApiBody({
    description: 'Book details data',
    type: BookDto,
    examples: {
      'application/json': {
        value: BOOK_BODY,
      },
    },
  })
  async createBook(@Req() req: { user: Me }, @Body() bookDto: BookDto) {
    return this.bookService.createBook(req.user.id, bookDto);
  }

  @Get()
  @ApiOperation({ summary: 'API for get all books' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Filter books by start date',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Filter books by end date',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  async getBooks(
    @Req() req: { user: Me },
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.bookService.getBooks(
      req.user.id,
      startDate,
      endDate,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'API for get details book' })
  async getBookById(@Param('id') bookId: string) {
    return this.bookService.getBookById(bookId);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'API for activate book' })
  async activateBook(@Req() req: { user: Me }, @Param('id') bookId: string) {
    return this.bookService.activateBook(bookId, req.user.id);
  }

  @Delete(':id/cancel')
  @ApiOperation({ summary: 'API for cancel book' })
  async cancelBook(@Req() req: { user: Me }, @Param('id') bookId: string) {
    return this.bookService.cancelBook(bookId, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'API for delete book' })
  async deleteBook(@Req() req: { user: Me }, @Param('id') bookId: string) {
    return this.bookService.deleteBook(req.user.id, bookId);
  }
}
