import request from 'supertest'
import app from '../config/app'

describe('SignUP Routes', () => {
    test('should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .send({
                name: 'Denis',
                email: 'denis@teste.com.br',
                password: '123',
                passwordConfirmation: '123'
            })
            .expect(200)
    });
});
