import Carousel from 'react-bootstrap/Carousel';
import { useGetProductByFilterQuery } from '../slices/productsApiSlice';
import Message from './Message';
import Loader from './Loader';
import Rating from '@mui/material/Rating';
import { LinkContainer } from 'react-router-bootstrap';

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetProductByFilterQuery('ratingHigh');

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant='danger'>{error?.data?.message || error.error}</Message>;
  }

  return (
    <Carousel fade interval={5000}>
      {products?.slice(0, 3).map((product) => (
        <Carousel.Item key={product._id} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}>
          <LinkContainer to={`/product/${product._id}`}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
              }}
            >
              <div
                style={{
                  backgroundColor: '#f8f8f8',
                  borderRadius: '8px',
                  padding: '20px',
                  maxWidth: '100%',
                  textAlign: 'center',
                }}
              >
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt="Product"
                  style={{ maxHeight: 'calc(60vh - 120px)', objectFit: 'contain' }}
                />
                <div style={{ marginTop: '10px' }}>
                  <h5 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>{product.name}</h5>
                  <Rating value={product.rating} readOnly/>
                  <b><p style={{ color: '#777', fontSize: '16px' }}>${product.price}</p></b>
                </div>
              </div>
            </div>
          </LinkContainer>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
