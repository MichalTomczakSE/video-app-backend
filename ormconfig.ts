import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'video-downloader',
  entities: ['dist/**/**.entity{.ts,.js}'],
  bigNumberStrings: false,
  logging: true,
  migrations: ['dist/migration/*.js'],
};
