const NUMBER_FORMAT = "0,0";

export const numberFormatter = (number: number) => {
  return Intl.NumberFormat().format(number);
};
