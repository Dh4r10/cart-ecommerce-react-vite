import React from "react";
import { Col, Card, Button } from "react-bootstrap";

import "./Product.scss";

const Product = (props) => {
  const {
    product: { id, image, title, extraInfo, price },
    addProductCart,
  } = props;

  return (
    <Col xs={3} className="product">
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{extraInfo}</Card.Text>
          <Card.Text>{price.toFixed(2)} $ / Unidad</Card.Text>
          <Button onClick={() => addProductCart(id, title)}>
            Añadir al carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
