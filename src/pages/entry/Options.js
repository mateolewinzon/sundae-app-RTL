import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import ScoopOption from './ScoopOption';
import TopicOptions from './ToppingOption';
import Alert from '../../common/Alert';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    async function GetItems() {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        setError(true)
      }
    }
    GetItems();
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : TopicOptions;

  
  const optionItems = items.map((item, key) => {
    return <ItemComponent name={item.name} imagePath={item.imagePath} key={key} />;
  });

  return error ? <Alert/> : <Container>{optionItems}</Container>;
};

export default Options;
