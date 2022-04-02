import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const AddMagazine = () => {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [authors, setAuthors] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    setErrors([]);
    e.preventDefault();

    try {
      const res = await axios.post("/api/magazines", {
        title,
        isbn,
        authors,
        publishedAt,
      });

      setSuccess(true);
    } catch (err) {
      console.log(err.response.data.errors);
      setErrors(err.response.data.errors);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="isbn">ISBN</Form.Label>
          <Form.Control
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="authors">Authors</Form.Label>
          <Form.Control
            type="text"
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            If there are more than 1 authors write emails by adding a ','
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="publishedAt">Published At</Form.Label>
          <Form.Control
            type="text"
            id="publishedAt"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
          />
        </Form.Group>

        {success && <Alert variant="success">Magazine Added</Alert>}
        {errors.length > 0 && (
          <Form.Text className="text-muted">
            {errors.map((err, i) => {
              return (
                <Alert variant="danger" key={i}>
                  {err.msg}
                </Alert>
              );
            })}
          </Form.Text>
        )}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddMagazine;
