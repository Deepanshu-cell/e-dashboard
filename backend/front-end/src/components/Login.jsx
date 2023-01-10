import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { message, Button } from "antd";
import { LOGIN } from "../Api/Api_methods";
import { getDataFromLocal, storeDataLocal } from "../LocalStorageHandler";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsUserAuth, getProducts }) => {
  const [data, setData] = useState({
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

  const handleLogin = (e) => {
    e.preventDefault();
    // validation for leaving fields empting
    for (const key in data) {
      if (!data[key]) {
        message.error(`Please fill  ${key} `);
        return;
      }
    }
    setBtnLoading(true);

    message.loading("Logging in...", 2, async () => {
      let { email, password } = data;
      let userData = { email, password }; // req data (body)

      let res = await LOGIN(userData); //signup api calling
      if (res.auth) {
        storeDataLocal("user", res.user);
        storeDataLocal("token", res.auth);
        setIsUserAuth(true);
        navigate("/");
        getProducts();
        message.success("Logged in successfully", 1, () => {
          message.success("Welcome to E-Dashboard", 2);
        });
      } else {
        message.error("Please enter correct email id and password");
        setBtnLoading(false);
      }
    });
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Form onSubmit={handleLogin}>
        <h2 className="my-4">Please Login...</h2>
        <Container>
          <Row className="justify-content-md-center my-5">
            <Col xs={7}>
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
              <Button type="primary" loading={btnLoading} onClick={handleLogin}>
                Submit
              </Button>
            </Col>
            <Form.Text className="text-muted">
              <Link to="/signup">Dont have an account? please Signup</Link>
            </Form.Text>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default Login;
