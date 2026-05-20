const request = require('supertest');
const app = require('../../src/app');

describe('User API Integration Tests', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200);
      
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/999')
        .expect(404);
    });
  });

  describe('POST /api/users without CSRF token', () => {
    it('should return 403 Forbidden', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const res = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(403); // Expecting Forbidden due to missing CSRF token
      
      expect(res.body).toEqual({ message: 'Invalid CSRF token' });
    });
  });

  describe('POST /api/users with CSRF token', () => {
    it('should create a new user', async () => {
      const tokenRes = await request(app)
        .get('/api/csrf-token')
        .expect(200);
      const csrfToken = tokenRes.body.csrfToken;

      const cookie = tokenRes.headers['set-cookie'][0].split(';')[0];

      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const res = await request(app)
        .post('/api/users')
        .set('Cookie', cookie)
        .set('x-csrf-token', csrfToken)
        .send(newUser)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(newUser.name);
      expect(res.body.email).toBe(newUser.email);
    });
  });
});
