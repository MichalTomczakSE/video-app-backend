import { Body, Controller, Get, Post } from "@nestjs/common";
import { CheckUrlDto } from "./dto/checkUrl.dto";
import { VideoService } from "./video.service";

@Controller('/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/check')
  checkVideoLink(@Body() checkUrlDto: CheckUrlDto) {
    return this.videoService.checkVideoLink(checkUrlDto);
  }
}
