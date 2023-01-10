import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { SIGNUP } from "../Api/Api_methods";
import { useNavigate, Link } from "react-router-dom";
import { message, Button } from "antd";
import React from "react";
import { storeDataLocal, getDataFromLocal } from "../LocalStorageHandler";

function Signup({ setIsUserAuth, getProducts }) {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isUserAuth = getDataFromLocal("user");
    if (isUserAuth) navigate("/");
  });

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // signup form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation for leaving fields empting
    for (const key in data) {
      if (!data[key]) {
        message.error(`Please fill  ${key} `);
        return;
      }
    }
    setBtnLoading(true);

    let { username, email, password } = data;
    let userData = { username, email, password }; // req data (body)
    message.loading("Signing up...", 2, async () => {
      let res = await SIGNUP(userData); //signup api calling
      if (res) {
        storeDataLocal("user", res.result);
        storeDataLocal("token", res.auth);
        navigate("/");
        setIsUserAuth(true);
        getProducts();
        message.success("Signed up successfully", 1, () => {
          message.success("Welcome to E-Dashboard", 2);
        });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
      <h2 className="my-4">Please Signup...</h2>
      <Container>
        <Row className="justify-content-md-center my-5">
          <Col xs={7}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-4">User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={data.username}
                onChange={changeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-4">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={changeHandler}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                className="fs-5"
                type="checkbox"
                label={showPassword ? "hide password" : "show password"}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </Form.Group>
            <Button type="primary" loading={btnLoading} onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
          <Form.Text className="text-muted">
            <Link to="/login">Have an account already? please login</Link>
          </Form.Text>
        </Row>
      </Container>
    </Form>
  );
}

export default Signup;
