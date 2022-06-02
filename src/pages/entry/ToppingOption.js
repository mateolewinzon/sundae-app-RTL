import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const TopicOptions = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0);
  };
  const controlId = `${name}-check`;
  return (
    <Col>
      <Form.Group controlId={controlId} as={Row}>
        <Form.Label column>{name}</Form.Label>
        <Form.Check onChange={handleChange} />
      </Form.Group>
      <img
        style={{ width: "100px" }}
        alt={`${name} topping`}
        src={`http://localhost:3030${imagePath}`}
      />
    </Col>
  );
};

export default TopicOptions;
