import React from "react";

import { Form, Popover, PopoverBody, OverlayTrigger } from "react-bootstrap";

const TermsPopover = () => {
  return (
    <Popover>
      <PopoverBody>No real ice cream will be delivered</PopoverBody>
    </Popover>
  );
};

const Terms = () => {
  return (
    <Form.Label>
      I agree to
      <OverlayTrigger overlay={TermsPopover}>
        <span style={{ color: "blue" }}> terms and conditions</span>
      </OverlayTrigger>
    </Form.Label>
  );
};

export default Terms;
