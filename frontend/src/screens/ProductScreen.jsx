import { useGetProductByIdQuery } from '../slices/productsApiSlice';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { Card, Paper, Typography, Grid } from '@mui/material';
import CartButton from '../components/CartButton';
import { useSpring, animated } from 'react-spring';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(productId);
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <div style={{ paddingTop: '100px' }}>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <animated.div style={fadeInProps}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <img
                src={data.image}
                alt="Product"
                style={{ width: '100%', height: 'auto', maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper style={{ height: '100%', padding: '20px' }}>
                <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                  <Grid item>
                    <Typography variant="h5">{data.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{data.description}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Price: ${data.price}</Typography>
                  </Grid>
                  <Grid item>
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
                  <Grid item>
                    <CartButton />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </animated.div>
      )}
    </div>
  );
};

export default ProductScreen;
