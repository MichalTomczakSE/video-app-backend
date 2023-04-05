import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('method get');
    return 'Hello World!';
  }
  getData(): string {
    console.log('method post');
    return 'data from client imported';
  }
}
