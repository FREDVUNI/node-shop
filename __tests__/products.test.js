const app = require("../app")
const request = require('supertest'); 
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

test('should get all the products',async()=>{
    await request(app)
    .get('/api/v1/products')
    .expect(200)
})

test('should fail because the product already exists',async()=>{
    await request(app)
    .post('/api/v1/products')
    .expect(400)
})

test('should get single product using product Id',async()=>{
    await request(app)
    .post('/api/v1/products/1')
    .expect(200)
})