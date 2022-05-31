import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import ScoopOption from "./ScoopOption";
import TopicOptions from "./ToppingOption";
import Alert from "../../common/Alert";
import { pricePerItems } from "../../consts/prices";
import { useOrderDetails } from "../../context/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();
  useEffect(() => {
    async function GetItems() {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        setError(true);
      }
    }
    GetItems();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : TopicOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item, key) => {
    return (
      <ItemComponent
        name={item.name}
        imagePath={item.imagePath}
        key={key}
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, optionType)
        }
      />
    );
  });

  return error ? (
    <Alert />
  ) : (
    <Container>
      <Row>
        <h3>{title}</h3>
      </Row>
      <p>{pricePerItems[optionType]} each</p>
      <p>
        {title} subtotal: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </Container>
  );
};

export default Options;
