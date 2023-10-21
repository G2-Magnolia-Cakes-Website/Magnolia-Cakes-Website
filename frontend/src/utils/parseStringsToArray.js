export const parseStringToParagraphsByNewline = (data) => {
  return data
    .replaceAll("\r", "")
    .split("\n")
    .filter((x) => x);
};

export const parseStringToArrayByComma = (data) => {
  return data.split(", ").filter((x) => x);
};
