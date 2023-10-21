export const getGalleryCategoryParam = (categoryName) => {
  return categoryName.replaceAll(" ", "-").replace("&", "and").toLowerCase();
};
