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

  describe('GET /cats', () => {
    it('should return 3 cat', async () => {
      await request(app.getHttpServer())
        .post('/cat')
        .send({
          breed: 'Corgi',
          origin: 'pluto',
          description: 'puffy',
          weight: 7,
          temperament: 'dopey',
          image: 'Corgi image'
        });

      await request(app.getHttpServer())
        .post('/cat')
        .send({
          breed: 'Pitbull',
          origin: 'Venus',
          description: 'Buff',
          weight: 15,
          temperament: 'stoic',
          image: 'Pitbull image'
        });


      const { status, body } = await request(app.getHttpServer()).get('/cat')

      expect(status).toBe(200);
      expect(body.length).toBe(3)
    })
  })

  describe('GET cat /breed/:breed', () => {
    it('should get a labrador', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/cat/Labrador')

      expect(status).toBe(200);
      expect(body.breed).toEqual('Labrador')
      expect(body.origin).toEqual('mars')
      expect(body.description).toEqual('happy go lucky goofy idiot')
      expect(body.weight).toEqual(13)
      expect(body.temperament).toEqual('dopey')
      expect(body.image).toEqual('labrador image')
    })
  })




})