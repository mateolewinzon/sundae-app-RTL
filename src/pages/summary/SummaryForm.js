import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

const SummaryForm = () => {
    const [disabled, setDisabled] = useState(true)

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label htmlFor="termsCheckbox">Terms and conditions</Form.Label>
            <Form.Check checked={!disabled} onChange={(e)=>setDisabled(!e.target.checked)} id="termsCheckbox" />
          </Form.Group>
        </Col>
        <Col>
          <Button disabled={disabled}>Submit</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SummaryForm;
