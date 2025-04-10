// utils/localStorage.js

const WISHLIST_KEY = "wishlist";

export const getWishlist = () => {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
};

export const toggleWishlist = (car) => {
  let wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === car.id);

  if (exists) {
    wishlist = wishlist.filter((item) => item.id !== car.id);
  } else {
    wishlist.push(car);
  }

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  return wishlist;
};
