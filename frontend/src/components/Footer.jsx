import React from 'react';
import './Footer.css'
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from '@mui/material';
import { useGetCategoryQuery } from '../slices/productsApiSlice';
import CreditCardIcon from '@material-ui/icons/CreditCard';
// import PayPalIcon from '@material-ui/icons/PayPal';
import VisaIcon from '@material-ui/icons/Visa';



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
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {category.toUpperCase()}
                        </Button>
                      </LinkContainer>
                    ))}
            </div>
          </div>
          <div className="col-sm-4">
  <h4 className="title">Payment</h4>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
  <div className="payment">
    <CreditCardIcon />
    <CreditCardIcon />
    {/* <PayPalIcon /> */}
    <VisaIcon />
  </div>
</div>
        </div>
        <hr />
        <div className="row text-center">
          <a href="http://lacodeid.com/" style={{ color: '#fff' }}>
            Copyright © Gallery Whisper
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
