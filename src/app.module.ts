import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { VideoModule } from './video/video.module';

@Module({
  imports: [VideoModule],
  controllers: [AppController, VideoController],
  providers: [AppService, VideoService],
})
export class AppModule {}
