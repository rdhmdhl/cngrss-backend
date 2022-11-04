const request = require('supertest');
const {State} = require('../../models/state');
const {Senator} = require('../../models/senator');
const { Representative } = require('../../models/representative');
let server;

describe('/api/states', () => {
    beforeEach(() => {server = require('../../index');})
    afterEach(async () => {
        server.close();
        await State.deleteMany({})
    });
    describe('GET /', () => {
        it('should return all states', async () => {
            await State.collection.insertMany([
                {name: 'state1'},
                {name: 'state2'},
            ]);
            const res = await request(server).get('/api/states');
            expect(res.status).toBe(200);   
            expect(res.body.some(s => s.name = 'state1')).toBeTruthy();
            expect(res.body.some(s => s.name = 'state2')).toBeTruthy();
        }); 
    });
});

describe('GET /:state_name', () => {
    it('should return representatives and senators is valid state is passed', async () => {
        const state = new State({name: 'state1'})
        await state.save();
      
        const members = {
            representatives: [],
            senators: []
        };

        const res = await request(server).get('/api/states/' + state.name);
        expect(res.status).toBe(200);


        expect(res.body).toMatchObject(members)
    });
});