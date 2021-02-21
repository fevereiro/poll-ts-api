import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers';
import app from '../config/app'

describe('SignUP Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect();
    })

    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })
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
