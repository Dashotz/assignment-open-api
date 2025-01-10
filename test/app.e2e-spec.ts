import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/digimon (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/digimon')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/api/v1/digimon/Agumon (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/digimon/Agumon')
      .expect(200);
  });

  it('/api/v1/levels (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/levels')
      .expect(200);
  });

  it('/api/v1/attributes (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/attributes')
      .expect(200);
  });
});
