export const CurrencyFormatter = (total) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  return formatter.format(total);
};
