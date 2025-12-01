// Cart functions
export const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
export const setCart = (cart) =>
  localStorage.setItem("cart", JSON.stringify(cart));

export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  setCart(cart);
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.id !== productId);
  setCart(cart);
  return cart;
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    setCart(cart);
  }

  return cart;
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

// Review functions
export const getReviews = (productId) => {
  const allReviews = JSON.parse(localStorage.getItem("reviews")) || {};
  return allReviews[productId] || [];
};

export const addReview = (productId, review) => {
  const allReviews = JSON.parse(localStorage.getItem("reviews")) || {};

  if (!allReviews[productId]) {
    allReviews[productId] = [];
  }

  const newReview = {
    ...review,
    id: Date.now(),
    date: new Date().toISOString(),
  };

  allReviews[productId].push(newReview);
  localStorage.setItem("reviews", JSON.stringify(allReviews));

  return newReview;
};
