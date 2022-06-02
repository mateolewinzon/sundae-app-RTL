import { render, screen } from '../../../test-utils/testing-library-utills';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal with the correct $ amount when scoops change', async () => {
  render(<Options optionType='scoops' />);

  //Check if subtotal text is rendered with the initial 0.00 amount

  const scoopSubtotal = await screen.findByText('Scoops subtotal: $', {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  //Check for vanilla and chocolate scoops input, and if it changes the subtotal to the correct value.

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /Vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopSubtotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /Chocolate/i,
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopSubtotal).toHaveTextContent('6.00'); //Adding different flavors should add up their amounts
});

test('update toppings subtotal with the correct $ amount when toppings change', async () => {
  render(<Options optionType='toppings' />);

  //Check if subtotal text is rendered with the initial 0.00 amount

  const toppingsTotal = await screen.findByText('Toppings subtotal: ', {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent('0.00');

  // Check the toppings checkboxes and check subtotal is added correctly

  const strawberriesCheckbox = await screen.findByRole('checkbox', {
    name: /Strawberries/i,
  });
  userEvent.click(strawberriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('1.00');

  const caramelCheckBox = await screen.findByRole('checkbox', {
    name: /Caramel/i,
  });
  userEvent.click(caramelCheckBox);
  expect(toppingsTotal).toHaveTextContent('2.00');

  const chocolateCheckbox = await screen.findByRole('checkbox', {
    name: /Chocolate/i,
  });
  userEvent.click(chocolateCheckbox);
  expect(toppingsTotal).toHaveTextContent('3.00');

  //unchecking one of the toppings, subtotal should update

  userEvent.click(strawberriesCheckbox);
  expect(toppingsTotal).toHaveTextContent('2.00');
});

describe('grand total', () => {
  test('grand total starts at 0.00, then updates correctly if scoop is added first', async () => {
    render(<OrderEntry />);

    //Grand total should start with value 0.00

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    //Adding two scoops first, check if grand total is correct

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: /Chocolate/i,
    });
    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    //Adding topping aftwerards, check if grand total is correct

    const chocolateToppingInput = await screen.findByRole('checkbox', {
      name: 'Chocolate',
    });
    userEvent.click(chocolateToppingInput);

    expect(grandTotal).toHaveTextContent('5.00');
  });
  test('grand total updates correctly if toppings is added first', async () => {
    render(<OrderEntry />);

    //Adding topping first, check if grand total is correct

    const chocolateToppingInput = await screen.findByRole('checkbox', {
      name: 'Chocolate',
    });
    userEvent.click(chocolateToppingInput);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('1.00');

    //Adding two scoops afterwards, check if grand total is correct

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, '2');

    expect(grandTotal).toHaveTextContent('5.00');
  });

  test('grand total updates correctly if item is removed', async () => {
    render(<OrderEntry />);

    // Check and uncheck a topping checkbox, to see if de-selected value is substracted from grandtotal

    const chocolateToppingInput = await screen.findByRole('checkbox', {
      name: /Chocolate/i,
    });

    userEvent.click(chocolateToppingInput);
    userEvent.click(chocolateToppingInput);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');

    // Set a scoop value, then change it for a lower value to see if grand total reduces accordingly

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: /Chocolate/i,
    });
    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, '2');
    userEvent.clear(chocolateScoopInput);
    userEvent.type(chocolateScoopInput, '1');

    expect(grandTotal).toHaveTextContent('2.00');
  });
});
