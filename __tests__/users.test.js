const app = require("../app")
const request = require('supertest'); 
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

test('should get all the users',async()=>{
    await request(app)
    .get('/api/v1/users')
    .expect(200)
})

test('should fail because the email already exists',async()=>{
    await request(app)
    .post('/api/v1/users/signup')
    .expect(400)
})

test('Invalid email password combination',async()=>{
    await request(app)
    .post('/api/v1/users/login')
    .expect(400)
})