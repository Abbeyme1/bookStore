import React from "react";
import Carousel from "../Components/Carousel";
import Card from "../Components/Card";
import { Col, Row } from "react-bootstrap";

export const Home = () => {
  return (
    <div>
      <Carousel />

      <Row xs={1} md={3} className="mt-3 g-4">
        <Card
          title="Books and Magazines"
          subTitle="Look at our entire collection of books and magazines"
          link="/list"
        />

        <Card
          title="Add a book"
          subTitle="Add your favourite book so others can get to know about it"
          link="/addBooks"
        />

        <Card
          title="Add a magazine"
          subTitle="Add your favourite magazine so others can get to know about it"
          link="/addMagazines"
        />
      </Row>
    </div>
  );
};
