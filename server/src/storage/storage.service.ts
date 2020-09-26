import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class StorageService {
  private readonly storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async uploadFile(filename: string) {
    const uploadedFile = await this.storage
      .bucket('if-biolog')
      .upload(filename, {
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });

    return uploadedFile[0].baseUrl;
  }
}
