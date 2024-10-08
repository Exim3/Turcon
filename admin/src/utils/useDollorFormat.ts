export const useDolorFormat = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return formattedAmount;
};
