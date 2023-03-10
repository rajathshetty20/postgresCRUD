const express = require('express');
const app = express();

app.use(express.json());

const crudEndpoints = require('../routes/crudEndpoints');
app.use('/', crudEndpoints);

const request = require('supertest');

describe('GET', () => {
    test('should return a list of users', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  
    test('should return a specific user when passed an id', async () => {
      const res = await request(app).get('/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
    });
  
    test('should return a 404 error for a non-existent user', async () => {
      const res = await request(app).get('/100');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'User not found');
    });
});

describe('POST', () => {
  test('should create a new user', async () => {
    const res = await request(app).post('/').send({ name: 'test_user', email: 'test_user@email.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'test_user');
    expect(res.body).toHaveProperty('email', 'test_user@email.com');
  });

  test('should return a 500 error if name is missing', async () => {
    const res = await request(app).post('/').send({email: 'test_user@email.com' });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Error creating user');
  });
});

describe('PUT', () => {
  test('update an existing user', async () => {
    const res = await request(app).put('/1').send({ name: 'test_user', email: 'test_user@email.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'test_user');
    expect(res.body).toHaveProperty('email', 'test_user@email.com');
  });

  test('should return a 500 error if name is missing', async () => {
    const res = await request(app).put('/1').send({email: 'test_user@email.com' });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Error updating user');
  });

  test('should return a 404 error for a non-existent user', async () => {
    const res = await request(app).put('/100').send({ name: 'test_user', email: 'test_user@email.com' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });
});

describe('DELETE', () => {
  test('delete an existing user', async () => {
    const res = await request(app).delete('/2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted');
  });
  
  test('should return a 404 error for a non-existent user', async () => {
    const res = await request(app).delete('/100');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });
});







