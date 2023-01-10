import React, { useState } from "react";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { getDataFromLocal } from "../LocalStorageHandler";
import { ADD_PRODUCT } from "../Api/Api_methods";
import { useNavigate } from "react-router-dom";

const AddComponent = ({ getProducts }) => {
  const [componentSize, setComponentSize] = useState("large");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleFinish = async (values) => {
    setBtnLoading(true);
    values.userId = JSON.parse(getDataFromLocal("user"))._id;
    let res = await ADD_PRODUCT(values);
    console.log(res);
    if (res) {
      message.success("Product added successfully");
      navigate("/");
      await getProducts();
    } else {
      message.error("Something went wrong");
    }
    setBtnLoading(false);
  };

  const onChange = (value) => {};

  const onSearch = () => {};

  return (
    <Spin tip="Adding Product..." spinning={btnLoading} size="default">
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        className="w-50 mx-auto mt-5"
        onFinish={handleFinish}
      >
        <h1>Add Product</h1>
        <Form.Item></Form.Item>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input Product Price!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input Product Category!",
            },
          ]}
        >
          <Select
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
            style={{ width: "560px" }}
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Electronics",
                label: "Electronics",
              },
              {
                value: "Cameras",
                label: "Cameras",
              },
              {
                value: "Televisions",
                label: "Televisions",
              },
              {
                value: "Ethenic Wear",
                label: "Ethenic Wear",
              },
              {
                value: "Western Wear",
                label: "Western Wear",
              },
              {
                value: "Gaming",
                label: "Gaming",
              },
              {
                value: "Shoes",
                label: "Shoes",
              },
              {
                value: "Women's Fashion",
                label: "Women's Fashion",
              },
              {
                value: "Books",
                label: "Books",
              },
              {
                value: "Sports & Fitness",
                label: "Sports & Fitness",
              },
              {
                value: "Desktops",
                label: "Desktops",
              },
              {
                value: "Mobile Phones",
                label: "Mobile Phones",
              },
              {
                value: "Laptops",
                label: "Laptops",
              },
              {
                value: "Grocery",
                label: "Grocery",
              },
              {
                value: "Others",
                label: "Others",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Product company"
          name="company"
          rules={[
            {
              required: true,
              message: "Please input Product Company!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Image Url"
          name="image"
          rules={[
            {
              required: true,
              message: "Please input Product Image Url!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Add Product">
          <Button type="primary" htmlType="submit" loading={btnLoading}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default AddComponent;
