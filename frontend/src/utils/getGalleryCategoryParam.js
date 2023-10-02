export const getGalleryCategoryParam = (categoryName) => {
  return categoryName.replace(" ", "-").toLowerCase();
};
