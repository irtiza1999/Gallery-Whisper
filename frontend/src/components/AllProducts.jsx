import { useEffect, useState } from 'react';
import { useGetAllProductQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import {useNavigate}  from 'react-router-dom';

const AllProducts = () => {
  const { data, isLoading, refetch, error } = useGetAllProductQuery();
  useEffect(() => {
    refetch();
  }, []);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const filter = event.target.value;
    navigate(`/filter/${filter}`);
  };


  return (
    <div>
      <Col style={{ textAlign: 'center' }}>
          <h5 style={{ marginBottom: '10px' }}>LATEST PRODUCTS</h5>
      </Col>
  {isLoading ? (
    <Loader />
  ) : error ? (
    <h3>{<Loader />}</h3>
  ) : (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        style={{ padding: '10px', textAlign: 'center', marginBottom: '80px' }}
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
