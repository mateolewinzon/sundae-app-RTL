import { render, screen } from '../../../test-utils/testing-library-utills';
import OrderEntry from '../OrderEntry';

import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { OrderDetailsProvider } from '../../../context/OrderDetails';

test('If request error on scoops or toppings routes, an alert is shown ', async () => {
  //overwrite handlers so that the routes throw server errors 

  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  const alerts = await screen.findAllByRole('alert');
  expect(alerts).toHaveLength(2); //one error for scoops, one for toppings
});
