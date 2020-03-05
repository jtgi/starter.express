const request = require('supertest');
const { app } = require('../../app');

describe('controller', () => {
  it('should create a new resource', async () => {
    const res = await request(app)
      .post('/resources')
      .send({ id: 'jtgi' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual('jtgi');
  });
});
