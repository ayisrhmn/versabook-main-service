import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { BookDto } from './dto/book.dto';
import { createResponse } from 'src/helper/api.helper';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  // Create book
  async createBook(userId: string, BookDto: BookDto) {
    const newBook = new this.bookModel({ userId, ...BookDto });
    const result = await newBook.save();
    return createResponse('success', 201, result);
  }

  // Get all books
  async getBooks(
    userId: string,
    startDate?: string,
    endDate?: string,
    page = 1,
    limit = 10,
  ) {
    const query: any = { userId };

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const total = await this.bookModel.countDocuments(query);
    const books = await this.bookModel
      .find(query)
      .sort({ createdAt: -1 }) // Sort by new
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      ...createResponse('success', 200, books),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getBookById(bookId: string) {
    const book = await this.bookModel.findById(bookId);
    if (!book)
      throw new NotFoundException(
        createResponse('success', 200, 'Booking not found'),
      );
    return createResponse('success', 200, book);
  }

  // Activate book
  async activateBook(bookId: string, userId: string) {
    const book = await this.bookModel.findOne({
      _id: bookId,
      userId,
    });
    if (!book)
      throw new NotFoundException(
        createResponse('error', 404, 'Book not found'),
      );

    book.deletedAt = null;
    await book.save();

    return createResponse('success', 200, 'Book activated successfully');
  }

  // Soft delete book
  async cancelBook(bookId: string, userId: string) {
    const book = await this.bookModel.findOne({
      _id: bookId,
      userId,
      deletedAt: null,
    });
    if (!book)
      throw new NotFoundException(
        createResponse('error', 404, 'Book not found'),
      );

    book.deletedAt = new Date();
    await book.save();

    return createResponse('success', 200, 'Book canceled successfully');
  }

  // Delete book
  async deleteBook(bookId: string) {
    const booking = await this.bookModel.findByIdAndDelete(bookId);
    if (!booking)
      throw new NotFoundException(
        createResponse('error', 404, 'Booking not found'),
      );
    return createResponse('success', 200, 'Booking deleted permanently');
  }
}
