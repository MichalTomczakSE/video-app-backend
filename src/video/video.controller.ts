import { Body, Controller, Post } from '@nestjs/common';
import { GenerateVideoDto } from './dto/generate-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/')
  checkVideoLink(@Body() generateVideoDto: GenerateVideoDto) {
    return this.videoService.checkVideoLink(generateVideoDto);
  }
}
