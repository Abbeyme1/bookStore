import request from "supertest"
import { app } from "../../app"


it('status !404 : listening to POST /api/books',async () => {
    const response = await request(app).post("/api/books").send({})

    expect(response.status).not.toEqual(404)
})

it("status 400 : invalide title",async () => {

    await request(app)
    .post("/api/books")
    .send({
        title: "",
        isbn: "8528-8965-7458",
        authors: "abc@gmail.com",
        description: "this is a description"
    })
    .expect(400)
})

it("status 400 : invalide isbn",async () => {

    await request(app)
    .post("/api/books")
    .send({
        title: "abcd",
        isbn: "",
        authors: "abc@gmail.com",
        description: "this is a description"
    })
    .expect(400)
})

it("status 400 : invalide authors",async () => {

    await request(app)
    .post("/api/books")
    .send({
        title: "abcde",
        isbn: "8528-8965-7458",
        authors: "",
        description: "this is a description"
    })
    .expect(400)
})

it("status 400 : invalide description",async () => {

    await request(app)
    .post("/api/books")
    .send({
        title: "abcde",
        isbn: "8528-8965-7458",
        authors: "a@a.com",
        description: ""
    })
    .expect(400)
})

it("status 201 : added book to DB",async () => {
    await request(app)
    .post("/api/books")
    .send({
        title: "abcde",
        isbn: "8528-8965-7458",
        authors: "a@a.com",
        description: "this is a description"
    })
    .expect(201)
})