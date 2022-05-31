import { Container } from "react-bootstrap";
import SummaryForm from "./pages/summary/SummaryForm";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        <SummaryForm />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
