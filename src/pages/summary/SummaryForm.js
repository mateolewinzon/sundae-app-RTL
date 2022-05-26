import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Terms from "./Terms";

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group controlId="termsCheckbox">
            <Terms />
            <Form.Check
              checked={!disabled}
              onChange={(e) => setDisabled(!e.target.checked)}
            />
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
