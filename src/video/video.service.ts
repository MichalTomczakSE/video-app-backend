import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CheckUrlDto } from './dto/checkUrl-dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private videoRepository: Repository<VideoEntity>,
  ) {}
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
      const URLWithoutQueryStrings = checkUrlDto.videoAddress
        .toString()
        .split('&')[0];
      const [title, videoUrl, thumbnail, duration] = await Promise.all([
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-title`),
        this.runCommand(`yt-dlp -f b ${URLWithoutQueryStrings} -g`),
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-thumbnail`),
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-duration`),
      ]);
      await this.videoRepository.save({
        title,
        thumbnailUrl: thumbnail,
        duration,
        videoUrl,
      });
      return {
        title,
        videoUrl,
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

  async showRecent() {
    return this.videoRepository.createQueryBuilder('VideoEntity')    .orderBy('VideoEntity.date_time_with_timezone', 'DESC')
      .take(10)
      .getMany();
  }
}
