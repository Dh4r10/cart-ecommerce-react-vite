import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Cart from "../Cart";
import Logo from "../../assets/svg/logo.svg";

import "./TopMenu.scss";

const TopMenu = (props) => {
  const { productsCart, getProductsCart, products } = props;

  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="top-menu"
      style={{ color: "white" }}
    >
      <Container>
        <BrandNav />
        {/* <MenuNav /> */}
        <Cart
          productsCart={productsCart}
          getProductsCart={getProductsCart}
          products={products}
        />
      </Container>
    </Navbar>
  );
};

function BrandNav() {
  return (
    <Navbar.Brand>
      <img src={Logo} alt="Logo" />
      <h2>La casa de los helados</h2>
    </Navbar.Brand>
  );
}

function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
      <Nav.Link href="#">Mascotas</Nav.Link>
    </Nav>
  );
}

export default TopMenu;
