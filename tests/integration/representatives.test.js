const request = require('supertest');
const { Representative } = require('../../models/representative');
let server;


describe('api/representatives', () => {
    beforeEach(() => {server = require('../../index');})
    afterEach(async () => {
        server.close();
        await Representative.deleteMany({})
    });

    describe('GET /', () => {
        it('should get all representatives', async () => {
            await Representative.collection.insertMany([
                {name: 'rep1'},
                {name: 'rep2'},
            ]);

            const res = await request(server).get('/api/representatives');
                expect(res.status).toBe(200);   
                expect(res.body.some(r => r.name = 'rep1')).toBeTruthy();
                expect(res.body.some(r => r.name = 'rep2')).toBeTruthy();
        });
    });

});
