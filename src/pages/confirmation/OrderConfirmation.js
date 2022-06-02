import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';

const OrderConfirmation = ({ setStep }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [values, updateItemCount, resetValues] = useOrderDetails();

  useEffect(() => {
    const postOrder = async () => {
      try {
        const response = await axios.post('http://localhost:3030/order');
        setOrderNumber(response.data.orderNumber);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    postOrder();
  }, []);
  return (
    <Container>
      <Row>{isLoading ? 'loading...' : `Order number: #${orderNumber}`}</Row>
      <Row>
        Thanks for buying.{' '}
        <Button
          onClick={() => {
            resetValues()
            setStep('entry');
          }}
        >
          Start new order
        </Button>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;
