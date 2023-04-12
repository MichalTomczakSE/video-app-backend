import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerateVideoDto } from './dto/generate-video.dto';
import { VideoService } from './video.service';
import { CheckUrlDto } from './dto/checkUrl-dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/recent')
  getRecentVideos() {
    return this.videoService.showRecent();
  }
  @Post('/')
  checkVideoLink(@Body() checkUrlDto: CheckUrlDto) {
    return this.videoService.checkVideoLink(checkUrlDto);
  }
}
