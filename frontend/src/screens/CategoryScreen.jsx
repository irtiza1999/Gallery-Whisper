import { useEffect, useState } from 'react';
import { useGetCategoryProductsQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';


const CategoryScreen = () => {
    const { category: cat } = useParams();
    const { data: products, isLoading, error } = useGetCategoryProductsQuery(cat);
    console.log(products);
    return (
        <div>
        <h2 style={{padding: '10px', textAlign :'center'}}>{cat}</h2>
        {isLoading ? (<Loader />) : error ? (<h3>{<Loader />}</h3>) : (
        <>
        <Row style={{padding: '10px', textAlign :'center', marginTop :'50px', marginBottom :'80px'}}>
            {products.map((product) => (
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

export default CategoryScreen
