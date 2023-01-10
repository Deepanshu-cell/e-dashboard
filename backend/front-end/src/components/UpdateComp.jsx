import React, { useState } from "react";
import { Button, message } from "antd";
import { Form, Input, Select } from "antd";
import { UPDATE_PRODUCT } from "../Api/Api_methods";
import Modal from "react-bootstrap/Modal";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UpdateProduct = ({ open, setOpen, updateProduct, getProducts }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    setConfirmLoading(true);
    const res = await UPDATE_PRODUCT(updateProduct._id, value);
    if (res.modifiedCount) {
      setConfirmLoading(false);
      setOpen(false);
      getProducts();
      message.success("Product updated successfully");
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Modal show={open}>
        <Modal.Header>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item name="_id" label="Product Id">
              <Input disabled={true} defaultValue={updateProduct?._id} />
            </Form.Item>
            <Form.Item name="name" label="Product Name">
              <Input defaultValue={updateProduct.name} />
            </Form.Item>
            <Form.Item name="price" label="Product Price">
              <Input defaultValue={updateProduct?.price} />
            </Form.Item>
            <Form.Item name="category" label="Product Category">
              <Input defaultValue={updateProduct?.category} />
            </Form.Item>
            <Form.Item name="company" label="Product Company">
              <Input defaultValue={updateProduct?.company} />
            </Form.Item>

            <Form.Item {...tailLayout}></Form.Item>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={confirmLoading}
                >
                  Update
                </Button>
              </Form.Item>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateProduct;
