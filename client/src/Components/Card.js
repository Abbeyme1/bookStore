import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const card = ({ title, subTitle, link }) => {
  return (
    <Col>
      <Link to={link} style={{ textDecoration: "none" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{subTitle}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default card;
