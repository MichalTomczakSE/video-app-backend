import { Injectable } from '@nestjs/common';
import { CheckUrlDto } from "./dto/checkUrl.dto";

@Injectable()
export class VideoService {
  checkVideoLink(checkUrlDto: CheckUrlDto) {
    try {
      new URL(checkUrlDto.videoAddress);
      return console.log(true);
    } catch (error) {
      return console.log(false);
    }
  }
}