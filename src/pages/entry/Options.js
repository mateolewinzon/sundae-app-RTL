import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
import TopicOptions from "./ToppingOption";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function GetItems() {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetItems();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : TopicOptions;

  const optionItems = items.map((item, key) => {
    return <ItemComponent name={item.name} imagePath={item.imagePath} key={key} />;
  });

  return <Container>{optionItems}</Container>;
};

export default Options;
