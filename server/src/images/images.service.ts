import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Image } from 'src/entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    private readonly storageService: StorageService,
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  async findAll() {
    return this.imagesRepository.find({
      select: ['id', 'name', 'url', 'createdAt'],
      cache: true,
    });
  }

  async uploadImage(
    image: Express.Multer.File,
    uploadImageDto: UploadImageDto,
    user: User,
  ) {
    const url = await this.storageService.uploadFile(image, 'images');

    await this.imagesRepository.save({
      name: uploadImageDto.name,
      url,
      user,
    });
  }
}
