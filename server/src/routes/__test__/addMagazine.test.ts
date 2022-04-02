import request from "supertest"
import { app } from "../../app"


it('status !404 : listening to POST /api/magazines',async () => {
    const response = await request(app)
    .post("/api/magazines")
    .send({})

    expect(response.status).not.toEqual(404)
})

it("status 400 : invalide title",async () => {

    await request(app)
    .post("/api/magazines")
    .send({
        title: "",
        isbn: "8528-8965-7458",
        authors: "abc@gmail.com",
        publishedAt: "2000-04-25"
    })
    .expect(400)
})

it("status 400 : invalide isbn",async () => {

    await request(app)
    .post("/api/magazines")
    .send({
        title: "abcd",
        isbn: "",
        authors: "abc@gmail.com",
        publishedAt: "2000-04-25"
    })
    .expect(400)
})

it("status 400 : invalide authors",async () => {

    await request(app)
    .post("/api/magazines")
    .send({
        title: "abcde",
        isbn: "8528-8965-7458",
        authors: "",
        publishedAt: "2000-04-25"
    })
    .expect(400)
})

it("status 400 : invalide publishedAt",async () => {

    await request(app)
    .post("/api/magazines")
    .send({
        title: "abcde",
        isbn: "8528-8965-7458",
        authors: "a@a.com",
        publishedAt: ""
    })
    .expect(400)
})

it("status 201 : added magazine to DB",async () => {
    await request(app)
    .post("/api/magazines")
    .send({
        title: "abcde",
        isbn: "8528-8965-7458",
        authors: "a@a.com",
        publishedAt: "2000-04-25"
    })
    .expect(201)
})