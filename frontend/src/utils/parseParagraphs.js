export const parseStringToParagraphsByNewline = (data) => {
  return data
    .replaceAll("\r", "")
    .split("\n")
    .filter((x) => x);
};
