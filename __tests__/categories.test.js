const app = require("../app")
const request = require('supertest'); 
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

test('should get all the categories',async()=>{
    await request(app)
    .get('/api/v1/categories')
    .expect(200)
})

test('should fail because the category already exists',async()=>{
    await request(app)
    .post('/api/v1/categories')
    .expect(400)
})

test('should get single category using category Id',async()=>{
    await request(app)
    .post('/api/v1/categories/1')
    .expect(200)
})