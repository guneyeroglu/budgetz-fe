export const calculatePercentage = (partialValue: number, totalValue: number): number => {
  if (totalValue <= 0 || partialValue <= 0) return 0;

  const percentage: number = (partialValue / totalValue) * 100;

  return Number.isFinite(percentage) ? Number(percentage.toFixed(2)) : 0;
};
