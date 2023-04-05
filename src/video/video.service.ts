import { Injectable } from '@nestjs/common';
import { CheckUrlDto } from './dto/checkUrl.dto';
import { exec } from 'child_process';

@Injectable()
export class VideoService {
  async generateVideoLink(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        if (stderr) {
          return reject(stderr);
        }
        return resolve(stdout);
      });
    });
  }

  async checkVideoLink(checkUrlDto: CheckUrlDto) {
    try {
      new URL(checkUrlDto.videoAddress);
      const downloadLink = await this.generateVideoLink(
        `yt-dlp -f best*[vcodec!=none][acodec!=none]  ${checkUrlDto.videoAddress} -g`,
      );
      return {
        URL: downloadLink,
        valid: true,
      };
    } catch (error) {
      return {
        error:
          'Provided link is invalid, or doesnt contain video. Please try again with valid URL address.',
      };
    }
  }
}
