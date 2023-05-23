import { useEffect, useState } from 'react';
import { useGetAllProductQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import ProductCard from './ProductCard';
import Grid from '@material-ui/core/Grid';

const AllProducts = () => {
  const { data, isLoading, error } = useGetAllProductQuery();

  return (
    <div>
      <h2 style={{ padding: '10px', textAlign: 'center' }}>Latest Products</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h3>{<Loader />}</h3>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ padding: '10px', textAlign: 'center', marginTop: '50px', marginBottom: '80px' }}
          >
            {Array.isArray(data) &&
              data.map((product) => (
                <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default AllProducts;
