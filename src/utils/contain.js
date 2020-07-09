//function to check whether the query is included in data
export const isContain = (data, query) => {
  return data.includes(query.toUpperCase() || query.toLowerCase())
    ? true
    : false;
};
