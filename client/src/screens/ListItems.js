import React, { useEffect, useState } from "react";

import GenerateTable from "../Components/generateTable";

export const ListItems = () => {
  const [bookHeaders, setBookHeaders] = new useState([]);
  const [books, setBooks] = useState([]);
  const [magazinesHeaders, setMagazinesHeaders] = new useState([]);
  const [magazines, setMagazines] = useState([]);
  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((res) => {
        let keys = Object.keys(res[0]);
        setBookHeaders(keys);
        setBooks(res);
      });

    fetch("/api/magazines")
      .then((res) => res.json())
      .then((res) => {
        let keys = Object.keys(res[0]);
        setMagazinesHeaders(keys);
        setMagazines(res);
      });
  }, []);

  return (
    <div>
      <br />
      <h3 style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        Books
      </h3>
      <GenerateTable headers={bookHeaders} data={books} />

      <br />
      <h3 style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        Magazines
      </h3>
      <GenerateTable headers={magazinesHeaders} data={magazines} />
    </div>
  );
};
