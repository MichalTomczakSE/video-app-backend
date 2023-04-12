import { IsUrl } from 'class-validator';

export class GenerateVideoDto {
  @IsUrl()
  videoAddress: string;
  @IsUrl()
  thumbnailUrl: string;
  title: string;
  duration: string;
}
