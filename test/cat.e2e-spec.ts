import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import { Cat } from '@prisma/client';
import { useContainer } from 'class-validator';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('Cats (e2e)', () => {
  let app: INestApplication;
  let database: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    database = app.get<DatabaseService>(DatabaseService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  })

  afterAll(async () => {
    await database.cat.deleteMany({})
  })

  describe('POST /cat', () => {
    it('create a cat', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/cat')
        .send({
          breed: 'Labrador',
          origin: 'mars',
          description: 'happy go lucky goofy idiot',
          weight: 13,
          temperament: 'dopey',
          image: 'labrador image'
        });

      expect(status).toBe(201);
      expect(body.breed).toEqual('Labrador')
      expect(body.origin).toEqual('mars')
      expect(body.description).toEqual('happy go lucky goofy idiot')
      expect(body.weight).toEqual(13)
      expect(body.temperament).toEqual('dopey')
      expect(body.image).toEqual('labrador image')
    });
  })




})