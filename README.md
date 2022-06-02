I have developed a simple project with the purpose of adding Jest-RTL testing to my skillset.

# Assignment:

## Write tests to ensure that:

### SummaryForm.js

- Checkbox is unchecked by default
- Checking checkbox enables button
- Unchecking checkbox again disables button
- Terms popover isn't in the DOM at render
- Terms popover is visible when hovering over text "terms and conditions"

### Options.js

- Using Mock Service Worker handle a mock response for /scoops and /toppings
- Toppings and scoops Images are rendered correctly
- If the requests throw an error, display an alert
- Initial grand total is $0.00
- Scoop subtotal updates correctly when scoops change.
- Each scoop costs $2.00
- Toppings subtotal updates correctly when toppings change.
- Each topping costs $1.00

### OrderEntry.js

- Grand total starts as $0.00
- grand total updates correctly when scoops or toppings change

### App.js, (happy path test / full app functional test)

- Select a combination of scoops and toppings
- Verify subtotals and grand total are correct
- Click button to place order
- See an order summary with an order number and the correct totals and grand totals
- Click on terms and conditions checkbox
- Click on confirmation button
- Uppon order confirmed page, click on "start new order"
- Back to entry page and values are back on default
