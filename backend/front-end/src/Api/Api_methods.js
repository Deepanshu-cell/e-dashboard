import { baseURL } from "./API_URL";
import axios from "axios";
import { getDataFromLocal } from "../LocalStorageHandler";

const Header = {
  "Content-Type": "application/json",
};

const authHeader = {
  headers: {
    authorization: `${JSON.parse(getDataFromLocal("token"))}`,
  },
};

// signup api method
export const SIGNUP = async (data) => {
  const url = baseURL + `/register`;
  const res = await axios.post(url, data, Header);
  return res.data;
};

// login api method
export const LOGIN = async (data) => {
  const url = baseURL + `/login`;
  const res = await axios.post(url, data, Header);
  return res.data;
};

// add product api
export const ADD_PRODUCT = async (data) => {
  const url = baseURL + `/add-product`;
  const res = await axios.post(url, data, authHeader);
  return res.data;
};

// get list of products
export const GET_PRODUCTS = async () => {
  const url = baseURL + `/products`;
  const res = await axios.get(url, {
    headers: {
      authorization: `${JSON.parse(getDataFromLocal("token"))}`,
    },
  });
  return res.data;
};

// delete product api
export const DELETE_PRODUCT = async (data) => {
  const url = baseURL + `/product/${data._id}`;
  const res = await axios.delete(url, authHeader);
  return res.data;
};

// update product
export const UPDATE_PRODUCT = async (product_id, data) => {
  const url = baseURL + `/product/${product_id}`;
  const res = await axios.put(url, data, authHeader);
  return res.data;
};

// search product
export const SEARCH_PRODUCT = async (data) => {
  const url = baseURL + `/search/${data}`;
  const res = await axios.get(url, authHeader);
  return res.data;
};

// empty search
export const SEARCH_EMPTY = async () => {
  const url = baseURL + `/search`;
  const res = await axios.get(url, authHeader);
  return res.data;
};

// cart api method

// add to cart
export const ADD_TO_CART = async (data) => {
  const url = baseURL + `/add-cart`;
  const res = await axios.post(url, data, Header);
  return res.data;
};

// getting cart products api
export const GET_CART_PRODUCTS = async () => {
  const url = baseURL + `/cart-products`;
  const res = await axios.get(url, Header);
  return res.data;
};

// delete product from cart
export const DELETE_CART_PRODUCTS = async (id) => {
  const url = baseURL + `/cart-products/${id}`;
  const res = await axios.delete(url, Header);
  return res.data;
};
