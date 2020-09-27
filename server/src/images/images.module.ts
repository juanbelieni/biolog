import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { StorageModule } from 'src/storage/storage.module';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [
    StorageModule,
    AuthModule,
    MulterModule.register({
      dest: path.join(__dirname, 'upload'),
    }),
    TypeOrmModule.forFeature([Image]),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
