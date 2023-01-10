import React from "react";
import { Avatar, List, Button, message } from "antd";
import { useState } from "react";

const CartSingle = ({ cartProduct, handleDeleteCartProduct }) => {
  const [qt, setQt] = useState(1);

  const handleInc = () => {
    setQt(qt + 1);
  };

  const handleDec = () => {
    if (qt === 1) {
      message.error(
        "Quantity cannot be less than 1 you can either remove product from cart"
      );
      return;
    }
    setQt(qt - 1);
  };

  return (
    <List.Item
      key={cartProduct?.product?.name}
      actions={[
        <Button
          onClick={() => {
            handleDeleteCartProduct(cartProduct);
          }}
          type="primary"
          danger
        >
          Remove
        </Button>,
        <span>
          <Button
            type="primary"
            size="small"
            className="mx-2"
            onClick={() => {
              handleInc(cartProduct);
            }}
          >
            +
          </Button>
          <strong>{qt}</strong>
          <Button
            type="primary"
            size="small"
            className="mx-2"
            onClick={() => {
              handleDec(cartProduct);
            }}
          >
            -
          </Button>
        </span>,
      ]}
      extra={<img width={272} alt="logo" src={cartProduct?.product?.image} />}
    >
      <List.Item.Meta
        avatar={<Avatar src={cartProduct?.product?.image} />}
        title={<a>{cartProduct?.product?.name}</a>}
        description={
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            delectus voluptatum commodi ducimus quibusdam, aliquid corrupti unde
            harum quos quae perspiciatis illum repellat, eveniet, officiis porro
            minus sit accusantium quaerat odit. Dolore, culpa porro.
          </>
        }
      />
      <h5>Price: &nbsp;{cartProduct?.product?.price}</h5>
      <h5>
        Amount:&nbsp;
        {cartProduct?.product?.price * qt}
      </h5>
    </List.Item>
  );
};

export default CartSingle;
