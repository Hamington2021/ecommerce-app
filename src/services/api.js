import axios from "axios";

const API_BASE = "https://dummyjson.com";

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data.products;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
};
