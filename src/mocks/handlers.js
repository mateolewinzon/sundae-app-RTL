import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/scoop-chocolate.png" },
        { name: "Vanilla", imagePath: "/images/scoop-vanilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Strawberries", imagePath: "/images/topping-strawberries.png" },
        { name: "Caramel", imagePath: "/images/topping-caramel.png" },
        { name: "Chocolate", imagePath: "/images/topping-chocolate.png" },
      ])
    );
  }),
  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(
      ctx.json({ orderNumber: Math.floor(Math.random() * 10000000000) })
    );
  }),
];
