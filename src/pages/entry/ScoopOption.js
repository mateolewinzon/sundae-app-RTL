import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

const ScoopOptions = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e) => {
    updateItemCount(name, event.target.value);
  };

  return (
    <Col>
      <img
        style={{ width: '100px' }}
        alt={`${name} scoop`}
        src={`http://localhost:3030${imagePath}`}
      />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label column>{name}</Form.Label>
        <Col>
          <Form.Control
            onChange={handleChange}
            type='number'
            defaultValue={0}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOptions;
