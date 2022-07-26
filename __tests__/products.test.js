const app = require("../app")
const request = require('supertest'); 
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

test('should get all the products',async()=>{
    await request(app)
    .get('/api/v1/products')
    .expect(200)
})