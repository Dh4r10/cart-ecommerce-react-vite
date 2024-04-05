import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading";
import Product from "../Product";

import "./Products.scss";

const Products = (props) => {
  const {
    products: { result, loading, error },
    addProductCart,
  } = props;

  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.data.map((product, id) => (
            <Product
              key={id}
              product={product}
              addProductCart={addProductCart}
            />
          ))
        )}
      </Row>
    </Container>
  );
};

export default Products;
