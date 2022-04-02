import request from "supertest"
import { app } from "../../app"


it('status !404 : listening to GET /api/find/',async () => {
    const response = await request(app).get("/api/find/")

    expect(response.status).not.toEqual(404)
})

it("status 400 : invalide attribute",async () => {

    await request(app)
    .get("/api/find/?abc=def")
    .expect(400)
})

it("status 201 : find by isbn",async () => {

    let title = "abcd",isbn = "8528-8965-7458",authors = "a@a.com,pqes@a.com",description = "this is a description"
    //create a book
    await request(app)
    .post("/api/books")
    .send({
        title,
        isbn,
        authors,
        description
    })
    .expect(201)


    const response = await request(app)
    .get(`/api/find/?isbn=${isbn}`)
    .expect(200)

    expect(response.body.title).toEqual(title)
    expect(response.body.isbn).toEqual(isbn)
    expect(fix(response.body.authors)).toEqual(authors)
    expect(response.body.description).toEqual(description)
})

const fix = (authors: string[]) => {
    return authors.map((author:string) => author).join(',');
}

it("status 201 : find by email",async () => {

    let email = "pqes@a.com";
    let title = "abcd",isbn = "8528-8965-7458",authors = "a@a.com,pqes@a.com",description = "this is a description"
    //create a book
    await request(app)
    .post("/api/books")
    .send({
        title,
        isbn,
        authors,
        description
    })
    .expect(201)


    const response = await request(app)
    .get(`/api/find/?email=${email}`)
    .expect(200)

    const data = response.body[0][0];

    expect(data.title).toEqual(title)
    expect(data.isbn).toEqual(isbn)
    expect(fix(data.authors)).toContain(email)
    expect(data.description).toEqual(description)
})
