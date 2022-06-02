import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';
import Options from './Options';

const OrderEntry = ({setStep}) => {
  const [orderDetails, updateItemCount] = useOrderDetails();

  return (
    <Container>
      <Options optionType='scoops'/>
      <Options optionType='toppings'/>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={()=>setStep('summary')}>Place order</Button>
    </Container>
  );
};

export default OrderEntry;
