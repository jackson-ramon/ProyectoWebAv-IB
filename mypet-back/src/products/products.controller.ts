import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, UseGuards, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Express } from 'express';
import { UsersService } from 'src/users/users.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import * as jwt from 'jsonwebtoken';



@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService, private usersService: UsersService,) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @GetUser() userToken: any,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {

    let decoded = null;

    try {
      decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new Error('Invalid token');
    }
    
    const id = decoded['id'];
    const user = await this.usersService.findOneById(id);

    console.log('ProductsController - User:', user.id);
    this.logger.debug(`User ID: ${user.id}`);
    const { name, price: productPrice } = createProductDto;
    const numberPrice = Number(productPrice);
    return await this.productsService.createProduct(user, name, numberPrice, image);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: number) {
    const user = await this.usersService.findOneById(userId);
    return await this.productsService.findAllById(user);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number) {
  //   return await this.productsService.findOne(id);
  // }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.productsService.delete(id);
  }
}
