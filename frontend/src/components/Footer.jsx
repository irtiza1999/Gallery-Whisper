import React from 'react';
import './Footer.css'
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from '@mui/material';
import { useGetCategoryQuery } from '../slices/productsApiSlice';
import { FaCcAmex, FaCreditCard, FaPaypal, FaCcVisa } from 'react-icons/fa';


const Footer = () => {
  const { data: categories, isLoading, isError, error } = useGetCategoryQuery();
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h4 className="title">About us</h4>
            <p>
              Gallery Whisper: Unleash the beauty of fine art. Discover captivating artworks and sculptures from talented artists. 
              Shop securely, explore artist profiles, and immerse yourself in the world of artistic expression. 
              Join our vibrant community of art lovers. Experience the power of art at Gallery Whisper.
            </p>
          </div>
          <div className="col-sm-4">
            <h4 className="title">Category</h4>
            <div className="category">
              {Array.isArray(categories) &&
                    categories.map((category) => (
                      <LinkContainer key={category} to={`/${category}`}>
                        <Button
                        style={{ color: 'white' }}
                          key={category}
                          sx={{ my: 2, color: 'white' }}
                          // className="categoryB"
                        >
                          {category.toUpperCase()}
                        </Button>
                      </LinkContainer>
                    ))}
            </div>
          </div>
          <div className="col-sm-4">
            <h4 className="title">Payment</h4>
            <ul className="payment">
              <li><span ><FaPaypal /></span></li>
              <li><span ><FaCcAmex /></span></li>
              <li><span ><FaCreditCard /></span></li>
              <li><span ><FaCcVisa /></span></li>
            </ul>
          </div>
        </div>
        <hr />
      <div className="row text-center">
        <span style={{ color: '#fff' }}>
          Copyright © Gallery Whisper
          {' '}
          {new Date().getFullYear()}
        </span>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
