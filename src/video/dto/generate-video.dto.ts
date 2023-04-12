import { IsUrl } from 'class-validator';

export class GenerateVideoDto {
  @IsUrl()
  videoAddress: URL;
  @IsUrl()
  thumbnailUrl: string;
  title: string;
  duration: string;
}
