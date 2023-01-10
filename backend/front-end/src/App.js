import "./App.css";
import NavbarComp from "./components/NavbarComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getDataFromLocal } from "./LocalStorageHandler";
import Login from "./components/Login";
import AddComponent from "./components/AddComponent";
import ProductMain from "./components/ProductMain";
import { GET_CART_PRODUCTS, GET_PRODUCTS } from "./Api/Api_methods";
import { message } from "antd";
import UpdateProduct from "./components/UpdateComp";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart";

function App() {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({});
  const [show, setShow] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    let UserAuth = getDataFromLocal("user");
    if (UserAuth) {
      setIsUserAuth(true);
    }
  }, []);

  useEffect(() => {
    getProducts();
    getProductsFromCart();
  }, []);

  useEffect(() => {
    setCartCount();
  }, [cartProducts]);

  const setCartCount = () => {
    return cartProducts.length;
  };

  const getProductsFromCart = async () => {
    const res = await GET_CART_PRODUCTS();
    console.log(res);
    setCartProducts(res);
  };

  const getProducts = async () => {
    setTableLoading(true);
    const res = await GET_PRODUCTS();
    if (res.result === "No product found") {
      message.info("Please add some products first !!!");
      setProducts([]);
    } else {
      setProducts(res);
    }

    setTableLoading(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ProductModal
          show={show}
          setShow={setShow}
          modalProduct={modalProduct}
        />
        <NavbarComp
          isUserAuth={isUserAuth}
          setIsUserAuth={setIsUserAuth}
          setCartCount={setCartCount}
        />
        <UpdateProduct
          open={open}
          setOpen={setOpen}
          updateProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
          getProducts={getProducts}
        />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route
              path="/"
              element={
                <ProductMain
                  setModalProduct={setModalProduct}
                  products={products}
                  setProducts={setProducts}
                  tableLoading={tableLoading}
                  getProducts={getProducts}
                  setOpen={setOpen}
                  setUpdateProduct={setUpdateProduct}
                  setShow={setShow}
                  getProductsFromCart={getProductsFromCart}
                  cartProducts={cartProducts}
                />
              }
            />
            <Route
              path="/add"
              element={
                <AddComponent getProducts={getProducts} products={products} />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  getProductsFromCart={getProductsFromCart}
                  cartProducts={cartProducts}
                  setCartProducts={setCartProducts}
                />
              }
            />
            <Route path="/profile" element={<h1>Profile Comig soon...</h1>} />
          </Route>
          <Route
            path="/signup"
            element={
              <Signup setIsUserAuth={setIsUserAuth} getProducts={getProducts} />
            }
          />
          <Route
            path="/login"
            element={
              <Login setIsUserAuth={setIsUserAuth} getProducts={getProducts} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
