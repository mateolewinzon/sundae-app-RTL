import React from "react";
import { Container, Image } from "react-bootstrap";

const ScoopOptions = ({ name, imagePath }) => {
  return (
    <Container>
      <img alt={`${name} scoop`} src={`https://localhost:3030/${imagePath}`} />
    </Container>
  );
};

export default ScoopOptions;
