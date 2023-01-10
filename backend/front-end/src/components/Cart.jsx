import React from "react";
import { List, message } from "antd";
import { DELETE_CART_PRODUCTS } from "../Api/Api_methods";
import CartSingle from "./CartSingle";

const Cart = ({ cartProducts, getProductsFromCart }) => {
  const handleDeleteCartProduct = async (cartProduct) => {
    const res = await DELETE_CART_PRODUCTS(cartProduct._id);
    console.log(res);
    if (res) {
      getProductsFromCart();
      message.success("Product removed successfully");
    }
  };

  return (
    <div className="text-center w-50 mx-auto my-3">
      <h1 className="my-5">Cart Products</h1>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={cartProducts}
        renderItem={(cartProduct) => (
          <CartSingle
            cartProduct={cartProduct}
            handleDeleteCartProduct={handleDeleteCartProduct}
          />
        )}
      />
    </div>
  );
};

export default Cart;
