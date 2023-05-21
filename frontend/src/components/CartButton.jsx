import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import './CartButton.css';

const CartButton = () => {
  const [clicked, setClicked] = useState(false);
  const buttonAnimation = useSpring({
    transform: clicked ? 'scale(1.2)' : 'scale(1)',
  });

  const handleButtonClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <animated.button
      size="small"
      color="primary"
      className={`cart-button ${clicked ? 'clicked' : ''}`}
      style={buttonAnimation}
      onClick={handleButtonClick}
    >
      {clicked ? <ShoppingCartIcon /> : 'Add to Cart'}
    </animated.button>
  );
};

export default CartButton;
