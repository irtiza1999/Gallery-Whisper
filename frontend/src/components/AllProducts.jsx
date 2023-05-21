import { useEffect, useState } from 'react';
import { useGetAllProductQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import ProductCard from './ProductCard';
import Grid from '@material-ui/core/Grid';


const AllProducts = () => {
    const { data, isLoading, error } = useGetAllProductQuery();
    console.log(data);
    return (
        <div>
        <h2 style={{padding: '10px', textAlign :'center'}}>Latest Products</h2>
        {isLoading ? (<Loader />) : error ? (<h3>{<Loader />}</h3>) : (
        <>
        <Row style={{padding: '10px', textAlign :'center', marginTop :'50px', marginBottom :'80px'}}>
            {data.map((product) => (
              <Grid container spacing={3}>
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              </Grid>
            ))}
          </Row>
        </>
        )
    }
    </div>
    )
  }

export default AllProducts
