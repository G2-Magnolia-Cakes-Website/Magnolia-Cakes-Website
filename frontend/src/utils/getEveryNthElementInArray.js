export const everyFirst = (arr) => {
  const arrCopy = [...arr];
  const firstElement = arrCopy.shift();
  const newArr = arrCopy.filter((e, i) => i % 2 === 2 - 1);
  return [firstElement, ...newArr];
};

export const everyNth = (arr, nth) => {
  return arr.filter((e, i) => i % nth === nth - 1);
};
