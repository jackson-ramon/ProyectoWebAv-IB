import { Body, Injectable, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { bucket } from '../firebase-admin';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from 'src/users/entities/user.entity';
import { SearchProductdto } from './dto/search-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(user: UserEntity, name: string, price: number, image: Express.Multer.File): Promise<ProductEntity> {
    console.log(`Creating product for user ID: ${user.id}`);
  
    let imageUrl: string = null;
    if (image) {
      imageUrl = await this.uploadImageToFirebase(image);
    }
  
    const productData: ProductEntity = {
      id: null,
      deletedAt: null,
      name,
      price,
      imageUrl: imageUrl,
      user: user,
    };
    console.log("ProductData: ", productData);
    await this.productsRepository.save(productData);
    return productData;
  }

  private async uploadImageToFirebase(file: Express.Multer.File): Promise<string> {
    const fileName = `products/${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype },
      public: true,
    });

    const [url] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    return url;
  }

  async findAllById(user: UserEntity): Promise<ProductEntity[]> {
    return await this.productsRepository.find({ where: { user: user } });
  }

  async findOne(id: number): Promise<ProductEntity> {
    return await this.productsRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    await this.productsRepository.update(id, updateProductDto);
  }

  async delete(id: number): Promise<void> {
    await this.productsRepository.softDelete(id);
  }

  async findOneByName(searchProductdto: SearchProductdto): Promise<ProductEntity[]> {
    return await this.productsRepository.find({ where: { name: searchProductdto.name } });
  }
}
