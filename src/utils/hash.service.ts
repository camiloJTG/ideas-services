import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from 'src/config/app/config.service';

@Injectable()
export class HashService {
  constructor(private AppConfigService: AppConfigService) {}

  async generateHash(plainText: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(
        plainText,
        parseInt(this.AppConfigService.salts.toString()),
      );
      return hash;
    } catch (error) {
      throw `Error hashing text plain. Error: ${error}`;
    }
  }

  async validateHash(
    plainText: string,
    encryptedText: string,
  ): Promise<boolean> {
    try {
      const result = await bcrypt.compare(plainText, encryptedText);
      return result;
    } catch (error) {
      throw `Error validating hash. Error: ${error}`;
    }
  }
}
