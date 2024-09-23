const request = require("supertest")
const app = require('./src/app')
const Restaurant = require("./models")
const syncSeed = require('./seed')
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

let resQuant
describe('testing routes/methods', ()=>{
    beforeAll(async () =>{
        await syncSeed()
        const restaurants = await Restaurant.findAll({})
        resQuant = restaurants.length
    })
    test('testing GET/all length array contents', async () => {
        const response = await request(app).get('/restaurants')
        let newArr = []
        newArr.push(response)
        expect(response.statusCode).toBe(200)
        expect(newArr).toEqual([response])
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body[0]).toHaveProperty("cuisine")
        expect(resQuant).toEqual(response.body.length)
        expect(response.body).toContainEqual(
            expect.objectContaining({
                "name":"AppleBees","location":"Texas","cuisine":"FastFood"
            })
        )
    })
    test('testing GET/ by id', async () => {
        const response = await request(app).get('/restaurants/1')
        
        expect(response.body).toEqual(
            expect.objectContaining({
                "name":"AppleBees","location":"Texas","cuisine":"FastFood"
            })
        )
    })
    test('testing GET/POST CREATE', async () => {
        const response = await request(app)
        .post('/restaurants/')
        .send({name:"ZAppleBees",location:"ZTexas", cuisine:"ZFastFood"})
        expect(resQuant.length).toEqual(response.body.length)
        
    })
    test('testing GET/PUT UPDATE', async () => {
        const response = await request(app)
        .post('/restaurants/1')
        .send({name:"ZestyAppleBees",location:"ZestyTexas", cuisine:"ZFastFood"})
        expect(resQuant.length).toEqual(response.body.length)
        
    })
    test('testing GET/id', async () => {
        const response = await request(app).get('/restaurants/:id')
        expect(response.statusCode).toBe(200)
       
    })
    test('testing DELETE/id', async () => {
        const response = await request(app).delete('/restaurants/4')
        expect(response.statusCode).toBe(200)
       
    })
})
