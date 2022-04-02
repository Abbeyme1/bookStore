import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const nav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="mx-auto">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            {" "}
            Raft Store{" "}
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default nav;
