import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../app.js';
import authServices from '../services/authServices.js';

describe('test / login route', () => {
  afterAll(() => {
    app.close();
  });
  // LOGIN SUCCESS RESPONSE
  test('Login success response', async () => {
    const signInData = {
      email: 'example3@example.com',
      password: 'examplepassword',
    };

    const {
      dataValues: { subscription, id },
    } = await authServices.findUser({
      email: signInData.email,
    });

    const { status, type, body } = await request(app)
      .post('/api/auth/login')
      .send(signInData);

    expect(status).toBe(200);
    expect(type).toBe('application/json');
    expect(body.user.email).toBe(signInData.email);
    expect(body.user.subscription).toBe(subscription);
    expect(Object.keys(body).length).toBe(2);
    expect(jwt.verify(body.token, process.env.JWT_SECRET_KEY)).toBeTruthy();
  });
  // LOGIN VALIDATION ERROR - MISSING PASSWORD
  test('Login validation error - missing password', async () => {
    const signInData = {
      email: 'example3@example.com',
    };

    const { status, text } = await request(app)
      .post('/api/auth/login')
      .send(signInData);

    expect(status).toBe(400);
    expect(text).toBe('{"message":"\\"password\\" is required"}');
  });
  // LOGIN VALIDATION ERROR - MISSING EMAIL
  test('Login validation error - missing email', async () => {
    const signInData = {
      password: 'examplepassword',
    };

    const { status, text } = await request(app)
      .post('/api/auth/login')
      .send(signInData);

    expect(status).toBe(400);
    expect(text).toBe('{"message":"\\"email\\" is required"}');
  });
  // LOGIN AUTH ERROR - INCORRECT EMAIL;
  test('Login auth error - incorrect email', async () => {
    const signInData = {
      email: 'example31@example.com',
      password: 'examplepassword',
    };

    const { status, body } = await request(app)
      .post('/api/auth/login')
      .send(signInData);

    expect(status).toBe(401);
    expect(body.message).toBe('Email or password is wrong');
  });
  // LOGIN AUTH ERROR - INCORRECT PASSWORD;
  test('Login auth error - incorrect password', async () => {
    const signInData = {
      email: 'example3@example.com',
      password: 'examplepassword1',
    };

    const { status, body } = await request(app)
      .post('/api/auth/login')
      .send(signInData);

    expect(status).toBe(401);
    expect(body.message).toBe('Email or password is wrong');
  });
});
