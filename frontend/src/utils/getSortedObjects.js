export const getSortedObjectsByAscId = (arr) => {
  return [...arr].sort((a, b) => {
    return a.id - b.id;
  });
};

export const getSortedObjectsByDescId = (arr) => {
  return [...arr].sort((a, b) => {
    return b.id - a.id;
  });
};
