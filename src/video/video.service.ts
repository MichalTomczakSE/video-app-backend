import { Injectable } from '@nestjs/common';
import { GenerateVideoDto } from './dto/generate-video.dto';
import { exec } from 'child_process';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { Repository } from 'typeorm';

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

  async checkVideoLink(generateVideoDto: GenerateVideoDto) {
    try {
      const URLWithoutQueryStrings = generateVideoDto.videoAddress
        .toString()
        .split('&')[0];
      const [title, videoAddress, thumbnailUrl, duration] = await Promise.all([
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-title`),
        this.runCommand(`yt-dlp -f b ${URLWithoutQueryStrings} -g`),
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-thumbnail`),
        this.runCommand(`yt-dlp ${URLWithoutQueryStrings} --get-duration`),
      ]);
      const videoData = {
        title,
        videoUrl: videoAddress,
        thumbnailUrl,
        duration,
      };
      await this.videoRepository.save(videoData);
      return {
        title,
        videoAddress,
        thumbnailUrl,
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
