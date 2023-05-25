import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Button, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useGetProductByIdQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import CartButton from '../components/CartButton';
import { Row, Col, Form } from 'react-bootstrap';
import { cartAdd } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(productId);
  const [cartItems, setCartItems] = useState([]);
  const [quan, setQuan] = useState();
  useEffect(() => {
    const prevQuan = cartItems.find((item) => item._id === productId)?.qty || 1;
    setQuan(prevQuan);
  }, [cartItems, productId]);
  
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const dispatch = useDispatch();
  const addToCartHandler = async (product, qty) => {
    dispatch(cartAdd({ ...product, qty }));
    toast.success(`${product.name} added to cart`);
  };

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);


  return (
    <Box paddingTop="100px">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Typography variant="h3" color="error">
          {error}
        </Typography>
      ) : (
        <animated.div style={fadeInProps}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <img
                src={data.image}
                alt="Product"
                style={{ width: '100%', height: 'auto', maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={{ height: '100%', padding: '20px' }}>
                <Grid item style={{ paddingBottom: '10px' }}>
                  {data.countInStock > 0 ? (
                    <Typography variant="body2" style={{ color: 'green' }}>
                      In Stock
                    </Typography>
                  ) : (
                    <Typography variant="body2" style={{ color: 'red' }}>
                      Out of Stock
                    </Typography>
                  )}
                </Grid>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Typography variant="h5">
                      <h4>{data.name}</h4>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <h5>{data.description}</h5>
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="body1">Price: ${data.price}</Typography>
                  </Grid>
                  {data.countInStock > 0 && (
                    <Grid item>
                      <Row>
                        <Col>
                          <h6>Quantity:</h6>
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quan}
                            onChange={(e) => setQuan(Number(e.target.value))}
                            style={{width: '100px'}}
                          >
                            {[...Array(data.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Grid>
                  )}

                  <Grid item>
                    <Col>
                      <h6>Total: ${(quan * data.price).toFixed(2)}</h6>
                    </Col>
                  </Grid>

                  {data.countInStock > 0 && (
                    <Grid item style={{ marginLeft: '-10px' }}>
                      <Button onClick={() => addToCartHandler(data, quan)} style={{backgroundColor : '#4834d4', color:'white'}}>Add to Cart</Button>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </animated.div>
      )}
    </Box>
  );
};

export default ProductScreen;
