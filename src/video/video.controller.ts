import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateVideoDto } from './dto/generate-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/recent')
  getRecentVideos() {
    return this.videoService.showRecent();
  }

  @Post('/')
  checkVideoLink(@Body() generateVideoDto: GenerateVideoDto) {
    return this.videoService.checkVideoLink(generateVideoDto);
  }
}
