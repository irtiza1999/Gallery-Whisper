import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper, Button, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useGetProductByIdQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import { Row, Col, Form } from 'react-bootstrap';
import { cartAdd } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '@mui/material/Rating';
import {useCreateReviewMutation, useGetReviewQuery} from '../slices/reviewApiSlice';
import Message from '../components/Message';
import Footer from '../components/Footer';
import { useGetFavoriteQuery } from '../slices/userApiSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';


const ProductScreen = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id: productId } = useParams();
  const {userInfo} = useSelector(state => state.auth);
  const { data, isLoading, refetch: refetchProduct, error } = useGetProductByIdQuery(productId);
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



  const [createReview, {isLoading: reviewSubmitLoading }] = useCreateReviewMutation();
  const {data: reviewData, isLoading: reviewSuccess, refetch: refetchReviews} = useGetReviewQuery(productId);
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    if (userInfo && reviewData && reviewData.some((review) => review.user === userInfo._id)) {
      refetchReviews();
      setFlag(true);
    }
  }, [reviewData, userInfo, data]);

  const [isFavorite, setIsFavorite] = useState(false);
  const { data: favProducts, FavIsLoading, refetch, favError } = useGetFavoriteQuery();
  useEffect(() => {
    if (favProducts) {
      const index = favProducts.findIndex((item) => item._id === data._id);
      if (index !== -1) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [favProducts, data]);
  
  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({ rating, comment, productId }).unwrap();
      if (res) {
        console.log(res);
        if (res.data.flag) {
          setFlag(true);
          toast.error('You have already reviewed the product');
          refetchReviews();
          refetchProduct();
        } else {
          toast.success('Review added successfully');
          setRating(0);
          setComment('');
          setFlag(true);
          refetchReviews();
        }
      } else {
        toast.error('Something went wrong');
        setRating(0);
        setComment('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error);
      setRating(0);
      setComment('');
      refetchReviews();
      refetchProduct();
    }
  };
  return (
    <div>
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
                      <b>In Stock</b>
                    </Typography>
                  ) : (
                    <Typography variant="body2" style={{ color: 'red' }}>
                      <b>Out of Stock</b>
                    </Typography>
                  )}
                  <Typography>
                      <div style={{marginTop:'10px'}}>
                      <LinkContainer to={`/${data.category}`} style={{cursor: 'pointer'}}>
                      <b>{data.category.toUpperCase()}</b>
                      </LinkContainer>
                      </div>
                    </Typography>
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
                  {isFavorite && userInfo &&
                  <>
                  <Grid item>
                    <div>
                      <Message variant='info'>
                        <b>
                          This product is in your
                          <LinkContainer to={`/favorites/${userInfo._id}`} 
                          style={{ color: 'blue', cursor: 'pointer',}}>
                            <span> Favorites list </span>
                          </LinkContainer>
                          <FavoriteIcon style={{ color: 'red' }} />
                        </b>
                      </Message>
                    </div>
                  </Grid>
                  </>
                  }
                  <Grid item>
                    <Row>
                      <Col sm={2}>
                      <Typography variant="body1">Rating: </Typography>
                      </Col>
                    <Col>
                    <Rating value={data.rating} precision={0.5} readOnly/>
                    </Col>
                    </Row>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Price: <b>${data.price}</b></Typography>
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
    <Box paddingTop="20px" >
    <Grid container>
      <Grid item sm={6}>
        <Paper style={{ height: '100%', padding: '20px' }}>
          <Grid item style={{ paddingBottom: '10px' }}>
            <Typography variant="h5">
              <h4 style={{textAlign :'center'}}>Customer Reviews</h4>
            </Typography>
          </Grid>
          {reviewSuccess && <Loader />}
          {!reviewSuccess && reviewData && reviewData.map((review) => (
            <Grid item key={review._id} style={{ border: '1px solid #ccc', 
            borderRadius: '8px', padding: '10px', marginBottom : '10px' }}>
              <Row>
                <Col sm={2}>
                  <Typography variant="body1">Rating: </Typography>
                </Col>
                <Col>
                  <Rating read={false} value={review.rating} readOnly/>
                </Col>
              </Row>
              <Row>
                <Col sm={2} xs={1} md={2}>
                  <Typography variant="body1">Comment: </Typography>
                </Col>
                <Col sm={2}>
                  <Typography variant="body1">{review.comment}</Typography>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <Typography variant="body1">By: </Typography>
                </Col>
                <Col>
                  <Typography variant="body1">{review.user.name.toUpperCase()}</Typography>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <Typography variant="body1">On: </Typography>
                </Col>
                <Col>
                  <Typography variant="body1">{review.createdAt.substring(0, 10)}</Typography>
                </Col>
              </Row>
            </Grid>
        ))}

        </Paper>
      </Grid>
      <Grid item sm={6}>
        <Paper style={{ height: '100%', padding: '20px' }}>
          <Grid item style={{ paddingBottom: '10px' }}>
            <Typography variant="h5">
              <h4 style={{textAlign :'center'}}>Write a Customer Review</h4>
            </Typography>
            <Typography variant="body1">
              <h6 style={{textAlign :'center'}}>Share your thoughts with other customers</h6>
            </Typography>
            <Box paddingTop="0px">
            {reviewSubmitLoading && <Loader />}
            {flag ?(
                <Message variant="success">You Have Reviewed The Product</Message>
            ):(
              <>
                {!reviewSubmitLoading && userInfo ? (
              <>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                   <Rating name="simple-controlled" value={rating} precision={0.5}  
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}/>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" style={{backgroundColor : '#4834d4', 
                color:'white', marginTop : '10px'}}>Submit</Button>
              </Form>
              </>
            ) : (
        <Message variant='info'>
        <div>
            <p>Please <LinkContainer to='/login'>
                <Button>
                  Login
                </Button>
            </LinkContainer> to submit a review</p>
        </div>
        </Message>
            )}
              </>
            ) }
            </Box>
            </Grid>
        </Paper>
        </Grid>
    </Grid>
  </Box>
  <Footer />
  </div>
  );
};

export default ProductScreen;
