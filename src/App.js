import { useState } from 'react';
import { Container } from 'react-bootstrap';
import OrderSummary from './pages/summary/OrderSummary';
import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { OrderDetailsProvider } from './context/OrderDetails';

function App() {
  const [step, setStep] = useState('entry')
  return (
    <Container>
      <OrderDetailsProvider>
       {step === 'entry' && <OrderEntry setStep={setStep} />}
       {step === 'summary' && <OrderSummary setStep={setStep}/>}
       {step === 'confirmation' && <OrderConfirmation setStep={setStep}/>}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
