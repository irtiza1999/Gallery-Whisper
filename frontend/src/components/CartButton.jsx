import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './CartButton.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartAdd } from '../slices/cartSlice';

const CartButton = ({product}) => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const buttonAnimation = useSpring({
    transform: clicked ? 'scale(1.2)' : 'scale(1)',
  });
  const qty = 1;
  const addToCartHandler = () => {
    dispatch(cartAdd({ ...product, qty }));
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
      onClick={addToCartHandler}
    >
      {clicked ? <ShoppingCartIcon /> : 'Add to Cart'}
    </animated.button>
  );
};

export default CartButton;
