import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { message, Badge } from "antd";
import { getDataFromLocal } from "../LocalStorageHandler";
import { ShoppingCartOutlined } from "@ant-design/icons";

const NavbarComp = ({ isUserAuth, setIsUserAuth, setCartCount }) => {
  const navigate = useNavigate();
  const user = getDataFromLocal("user");
  const handleLogout = () => {
    localStorage.clear();
    setIsUserAuth(false);
    navigate("/signup");
    message.success("Logged out successfully");
  };
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        onClick={() => {
          if (!isUserAuth) message.warning("Please Signup first");
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src="https://cdn3.iconfinder.com/data/icons/seo-marketing-flat-circle-vol-2/96/Bandwidth_control_meter_speed-512.png"
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link to="/" className="link mx-3" id="logotext">
              E-Dashbaord
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto ">
            {isUserAuth ? (
              <>
                {" "}
                <Nav.Link className="mt-2">
                  <Link to="/" className="link link-center mx-3">
                    <Tooltip title="Products Dashboard">Products</Tooltip>
                  </Link>
                </Nav.Link>
                <Nav.Link className="mt-2">
                  <Link to="/add" className="link link-center mx-3">
                    <Tooltip title="Add product">Add product</Tooltip>
                  </Link>
                </Nav.Link>
                <Nav.Link className="mt-2">
                  <Link to="/cart" className="link link-center mx-3">
                    <Tooltip title="Cart">
                      <Badge count={setCartCount()} overflowCount={10}>
                        <ShoppingCartOutlined
                          style={{ fontSize: "30px", color: "white" }}
                          className="mb-2"
                        />
                      </Badge>
                    </Tooltip>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Nav.Link>
                <Nav.Link>
                  <NavDropdown
                    title={JSON.parse(user).username}
                    id="basic-nav-dropdown"
                    className="link "
                  >
                    <NavDropdown.Item>
                      <Link to="/profile" className="linkDr">
                        Profile
                      </Link>
                    </NavDropdown.Item>
                    {!isUserAuth ? (
                      <>
                        <NavDropdown.Item>
                          <Link to="/signup" className="linkDr">
                            Signup
                          </Link>
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <NavDropdown.Item>
                        <Link className="linkDr" onClick={handleLogout}>
                          Logout
                        </Link>
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComp;
