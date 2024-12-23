export const maskMonthDay = (value: string): string => {
  let n: number = parseInt(value);
  if (isNaN(n)) return "";
  if (n < 0) n = 1;
  if (n > 31) n = 31;
  return n.toString();
};

export const maskDecimal = (value: string): string => {
  const numericValue = value.toString().replace(/\D/g, "");
  if (!numericValue) return "0.00";

  const cents = parseInt(numericValue, 10);
  return (cents / 100).toFixed(2);
};

export const maskCurrency = (value: any, locale: string = "en-US"): string => {
  const numericValue = (value ?? 0).toFixed(2).replace(/\D/g, "");
  if (!numericValue) return "0.00";

  const cents = parseInt(numericValue, 10);
  return (cents / 100).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
