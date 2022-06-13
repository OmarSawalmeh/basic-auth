"use strict";
const { server } = require("../src/server");
const supertest = require("supertest");
const request = supertest(server);

const { sequelize } = require('../src/auth/models/users-model');

beforeAll(async () => {
  await sequelize.sync();
});

describe('Web server', () => {
  it('Test create a new user...', async () => {
    const response = await request.post('/signup').send({
      "username": "Trent",
      "password": "liverpool66"
    })
    expect(response.status).toEqual(201);
  });
});

afterAll(async () => {
  await sequelize.drop();
});