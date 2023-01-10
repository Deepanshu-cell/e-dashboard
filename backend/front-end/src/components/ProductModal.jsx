import React from "react";
import { Modal, Card } from "antd";
const { Meta } = Card;

const ProductModal = ({ show, setShow, modalProduct }) => {
  const handleOk = () => {
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        centered
        title="Product"
        open={show}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="d-flex p-2">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="example" src={modalProduct.image} />}
          >
            <Meta title={modalProduct.name} description={""} />
          </Card>
          <p className="mx-3 text-right">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime in
            doloribus temporibus quo repudiandae aliquid incidunt voluptas ea
            magni, voluptatibus aperiam deleniti voluptates explicabo asperiores
            delectus rerum hic eum aspernatur blanditiis ut laudantium. Nam
            numquam autem vel voluptas. Itaque officiis, odit enim quisquam
            aspernatur aliquam rem eius nam. Exercitationem accusamus facilis
            voluptatum, nam deleniti alias.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ProductModal;
