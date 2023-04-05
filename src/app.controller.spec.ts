import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return page structure with all endpoints', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('root', () => {
    it('should return data from client"', () => {
      expect(appController.showData()).toBe('data from client imported');
    });
  });
});
