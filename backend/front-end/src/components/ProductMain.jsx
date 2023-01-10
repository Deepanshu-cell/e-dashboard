import React, { useState } from "react";
import { message, Space, Table, Tag, Avatar, Button } from "antd";
import {
  ADD_TO_CART,
  DELETE_PRODUCT,
  SEARCH_EMPTY,
  SEARCH_PRODUCT,
} from "../Api/Api_methods";
import { Popconfirm } from "antd";
import { Select } from "antd";

const ProductMain = ({
  cartProducts,
  products,
  tableLoading,
  getProducts,
  setOpen,
  setUpdateProduct,
  setProducts,
  setShow,
  setModalProduct,
  getProductsFromCart,
}) => {
  const handleDelete = async (p) => {
    const res = await DELETE_PRODUCT(p);
    if (res.deletedCount) {
      getProducts();
      message.success(`Product ${p.name} deleted Successfully`);
    } else {
      message.error("Something went wrong");
    }
  };

  const handleProductModal = (text) => {
    let p = products.find((p) => p.name === text);
    setShow(true);
    setModalProduct(p);
  };

  const handleSearch = async (value) => {
    if (value === "") {
      const res = await SEARCH_EMPTY();
      setProducts(res);
    } else {
      const res = await SEARCH_PRODUCT(value);
      setProducts(res);
    }
  };

  const handleAddToCart = async (record) => {
    message.loading("adding to cart...", 1, async () => {
      let cartPd = cartProducts.find((p) => record._id === p.product._id);
      if (cartPd) {
        message.warning("Product already added to cart");
        return;
      }
      let data = { product: record, quantity: 1 };
      const res = await ADD_TO_CART(data);
      if (res) {
        message.success("Product added to cart successfully");
        getProductsFromCart();
        message.config({ top: 60 });
      }
    });
  };

  const getProductsObj = () => {
    let prd = [...products];
    let prdArr = prd.map((p) => {
      let prdObj = {
        value: p.name,
        label: p.name,
      };
      return prdObj;
    });
    return prdArr;
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "image",
      key: "image",
      render: (image) => <Avatar src={image} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <a
          onClick={() => {
            handleProductModal(text);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Company",
      key: "company",
      dataIndex: "company",
      render: (company) => {
        {
          let color = company.length > 5 ? "geekblue" : "green";
          if (company.length < 3) {
            color = "volcano";
          }
          return (
            <Tag color={color} key={company}>
              {company}
            </Tag>
          );
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this Product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDelete(record);
            }}
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
          <a
            style={{ color: "blue" }}
            onClick={() => {
              setOpen(true);
              setUpdateProduct(record);
            }}
          >
            Update
          </a>
          <a
            style={{ color: "blue" }}
            onClick={() => {
              handleAddToCart(record);
            }}
          >
            <Button
              type="primary"
              size="small"
              style={{ backgroundColor: "green" }}
            >
              Add Cart
            </Button>
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1 className="my-5">Get Your Added products here</h1>
      <Select
        showSearch
        style={{
          width: 200,
        }}
        onSearch={handleSearch}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={getProductsObj()}
      />

      <Table
        bordered={true}
        columns={columns}
        dataSource={!tableLoading ? products : []}
        className="w-50 mx-auto"
        style={{ marginTop: "5%" }}
        loading={tableLoading}
        pagination={{
          pageSize: 7,
          total: products.length,
          position: ["bottomCenter"],
        }}
        size="large"
      />
    </div>
  );
};

export default ProductMain;
