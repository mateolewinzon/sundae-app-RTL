import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { pricePerItems } from "../consts/prices";


function formatCurrency(currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(currency);
}

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) throw new Error("useOrderDetails must be within the provider");

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItems[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoops = calculateSubtotal("scoops", optionCounts);
    const toppings = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoops + toppings;
    setTotals({
      scoops: formatCurrency(scoops),
      toppings: formatCurrency(toppings),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    };
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return (
    <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>
  );
};
