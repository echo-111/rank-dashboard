export const getSortedData = (data, property) => {
  return data.sort((a, b) => b[property] - a[property]);
};

export const calculateAverage = (data, property) => {
  const sum = data.reduce((acc, obj) => acc + obj[property], 0);
  return sum / data.length;
};

export function findFirstBelowAverageIndex(data, property) {
  const average = calculateAverage(data, property);
  return data.findIndex(obj => obj[property] < average);
};

export function getPropertyArray(data, property) {
  return data?.map(obj => obj[property]);
};

export const isPopulatedArray = (data) =>
  data && Array.isArray(data) && data.length > 0;

export const getNewArr = (arr, index) => {
  return [arr[index]].concat(arr.slice(0, index), arr.slice(index + 1));
};