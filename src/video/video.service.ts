import { Injectable } from '@nestjs/common';
import { CheckUrlDto } from './dto/checkUrl.dto';
import { exec } from 'child_process';

@Injectable()
export class VideoService {
  async runCommand(command: string): Promise<string> {
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
      const URLWithoutQueryStrings = checkUrlDto.videoAddress
        .toString()
        .split('&')[0];
      const [title, videoURL, thumbnail, duration] = await Promise.all([
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-title`),
        this.runCommand(`yt-dlp -f b ${URLWithoutQueryStrings} -g`),
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-thumbnail`),
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-duration`),
      ]);

      return {
        title,
        videoURL,
        thumbnail,
        duration,
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
