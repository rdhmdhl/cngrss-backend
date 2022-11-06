const request = require('supertest');
const { Senator } = require('../../models/Senator');
let server;


describe('api/Senators', () => {
    beforeEach(() => {server = require('../../index');})
    afterEach(async () => {
        server.close();
        await Senator.deleteMany({})
    });

    describe('GET /', () => {
        it('should get all Senators', async () => {
            await Senator.collection.insertMany([
                {name: 'rep1'},
                {name: 'rep2'},
            ]);

            const res = await request(server).get('/api/Senators');
                expect(res.status).toBe(200);   
                expect(res.body.some(r => r.name = 'rep1')).toBeTruthy();
                expect(res.body.some(r => r.name = 'rep2')).toBeTruthy();
        });
    });

});
