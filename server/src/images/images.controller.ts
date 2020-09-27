import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/upload-image.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ImagesService } from './images.service';
import { ReqUser } from 'src/decorators/req-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  index() {
    return this.imagesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  uploadImage(
    @ReqUser() user: User,
    @UploadedFile() image: Express.Multer.File,
    @Body() uploadImageDto: UploadImageDto,
  ) {
    return this.imagesService.uploadImage(image, uploadImageDto, user);
  }
}
