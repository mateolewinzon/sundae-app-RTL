import { Container, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';
import SummaryForm from './SummaryForm';

const OrderSummary = ({setStep}) => {
  const [orderDetails, updateItemCount] = useOrderDetails();
  return (
    <Container>
      <Row>
          <h2>Order summary</h2>
        <p>
          Scoops subtotal: {orderDetails.totals.scoops}
        </p>
        <p>
          Toppings subtotal: {orderDetails.totals.toppings}
        </p>
        <p style={{fontWeight: 'bold'}}>Grand total: {orderDetails.totals.grandTotal}</p>
      </Row>
      <SummaryForm setStep={setStep}/>
    </Container>
  );
};
export default OrderSummary;
