import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { storage } from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private readonly bucket: Bucket;

  constructor() {
    this.bucket = storage().bucket();
  }

  private getDownloadUrl(name: string) {
    return `https://storage.googleapis.com/biolog-api.appspot.com/${name}`;
  }

  async uploadFile(file: Express.Multer.File, folder: string) {
    const uniqueName = String(Date.now());
    const extension = path.extname(file.originalname);

    const uploadedFile = await this.bucket.upload(file.path, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
      destination: `${folder}/${uniqueName}${extension}`,
      public: true,
    });

    return this.getDownloadUrl(uploadedFile[0].name);
  }
}
