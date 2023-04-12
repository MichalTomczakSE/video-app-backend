import { IsUrl } from "class-validator";

export class CheckUrlDto {
  @IsUrl()
  videoAddress:URL
}