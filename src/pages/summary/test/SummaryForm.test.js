import { screen, render, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Button is enabled and disabled by checkbox", () => {
  test("checkbox is unchecked and button is disabled by default", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole("button", { name: /confirm order/i });
    expect(button).toBeDisabled();
  });

  test("checking and unchecking checkbox enables and disables button", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole("button", { name: /confirm order/i });

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});

test("Popover responds to hover", () => {
  render(<SummaryForm setStep={jest.fn()}/>);

  const nullPopover = screen.queryByText(
    /no real ice cream will be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no real ice cream will be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  const newNullPopover = screen.queryByText(/no real ice cream will be delivered/)
  expect(newNullPopover).not.toBeInTheDocument();
});
