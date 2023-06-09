import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';
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

  describe('GET /cat', () => {
    it('should return 3 cats', async () => {
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

  describe('GET cat /:breed', () => {
    it('should throw 404 for not found', async () => {
      const { status } = await request(app.getHttpServer()).get('/cat/frog')

      expect(status).toBe(404)
    })

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

  describe('PUT /cat', () => {
    it('should update labrador weight', async () => {
      const { status, body } = await request(app.getHttpServer()).put('/cat')
        .send({
          breed: 'Labrador', weight: 7
        })

      expect(status).toBe(200);
      expect(body.breed).toEqual('Labrador')
      expect(body.origin).toEqual('mars')
      expect(body.description).toEqual('happy go lucky goofy idiot')
      expect(body.weight).toEqual(7)
      expect(body.temperament).toEqual('dopey')
      expect(body.image).toEqual('labrador image')
    })
  })

  describe('DELETE /cat/uuid', () => {
    it('should delete Labrador', async () => {
      const { body } = await request(app.getHttpServer()).get('/cat/Labrador')

      await request(app.getHttpServer()).delete(`/cat/${body.id}`)

      const { status } = await request(app.getHttpServer()).get('/cat/Labrador')

      expect(status).toBe(404)
    })
  })




})