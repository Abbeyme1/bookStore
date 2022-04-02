import React from "react";
import { Table } from "react-bootstrap";

const GenerateTable = ({ headers, data }) => {
  const getHeader = () => {
    return (
      headers &&
      headers.map((header) => {
        return <th key={header}>{header.toUpperCase()}</th>;
      })
    );
  };

  const RenderRow = (props) => {
    return props.keys.map((key, index) => {
      if (key === "authors") {
        let authors = fix(props.data[key]);
        return <td key={authors}>{authors}</td>;
      } else return <td key={props.data[key]}>{props.data[key]}</td>;
    });
  };

  const getRowsData = () => {
    return data.map((book, index) => {
      return (
        <tr key={index}>
          <RenderRow key={index} data={book} keys={headers} />
        </tr>
      );
    });
  };

  const fix = (authors) => {
    return authors.map((author) => author).join(",");
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>{getHeader()}</tr>
      </thead>
      <tbody>{getRowsData()}</tbody>
    </Table>
  );
};

export default GenerateTable;
