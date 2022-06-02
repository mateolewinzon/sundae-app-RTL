import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases - happy path (functional test for entire ordering process)', async () => {
  render(<App />);

  // Select a combination of scoops and toppings

  const chocolateScoopInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  const caramelToppingInput = await screen.findByRole('checkbox', {
    name: 'Caramel',
  });
  userEvent.clear(chocolateScoopInput);
  userEvent.type(chocolateScoopInput, '2');
  userEvent.click(caramelToppingInput);

  // verify subtotals and grand total are correct

  const toppingsSubtotal = screen.getByText('Toppings subtotal: $', {
    exact: false,
  });
  const scoopsSubtotal = screen.getByText('Scoops subtotal: $', {
    exact: false,
  });
  const grandTotal = screen.getByText('Grand total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('4.00');
  expect(toppingsSubtotal).toHaveTextContent('1.00');
  expect(grandTotal).toHaveTextContent('5.00');

  // click button to place order

  const placeOrderButton = screen.getByRole('button', { name: /place order/i });
  userEvent.click(placeOrderButton);

  // see an order summary with the correct totals and grand totals

  const summaryTitle = screen.getByRole('heading', { name: /order summary/i });
  expect(summaryTitle).toBeInTheDocument();

  const subtotalsOnSummary = screen.getAllByText('subtotal: $', {
    exact: false,
  });
  expect(subtotalsOnSummary).toHaveLength(2);

  const grandTotalOnSummary = screen.getByText('Grand total: $', {
    exact: false,
  });
  expect(grandTotalOnSummary).toHaveTextContent('5.00');

  // click on terms and conditions

  const termsCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(termsCheckbox);

  // click on confirmation button

  const confirmationButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmationButton);

  // see a thank you message and an order number

  const orderNumber = await screen.findByText('Order number:', {
    exact: false,
  });
  expect(orderNumber).toBeInTheDocument();

  // uppon order confirmed page, click on 'start new order' button

  const startNewButton = screen.getByRole('button', {
    name: /start new order/i,
  });
  userEvent.click(startNewButton);

  // back in selection page, all inputs are displayed and all values and totals are the default

  const newChocolateScoopInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  expect(newChocolateScoopInput).toBeInTheDocument();
  const newChocolateToppingInput = await screen.findByRole('checkbox', {
    name: /chocolate/i,
  });
  expect(newChocolateToppingInput).toBeInTheDocument();
  const newToppingsSubtotal = screen.getByText('Toppings subtotal', {
    exact: false,
  });
  expect(newToppingsSubtotal).toHaveTextContent('0.00');
  const newScoopsSubtotal = screen.getByText('Scoops subtotal', {
    exact: false,
  });
  expect(newScoopsSubtotal).toHaveTextContent('0.00');
  const newGrandTotal = screen.getByText('Grand total: ', {exact: false})
  expect(newGrandTotal).toHaveTextContent('0.00');
});
