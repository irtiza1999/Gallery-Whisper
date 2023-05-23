import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton, Tooltip } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import CartButton from './CartButton';
import { LinkContainer } from 'react-router-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AnimatedCard = animated(Card);

const ProductCard = ({ product }) => {
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 300, friction: 10 },
  });

  const hoverProps = useSpring({
    transform: 'scale(1)',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.10)',
    from: { transform: 'scale(0.9)', boxShadow: 'ash' },
  });

  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <AnimatedCard style={{ ...animationProps, ...hoverProps }} sx={{ maxWidth: 200 }}>
        <Card sx={{ maxWidth: 250 }}>
          <LinkContainer to={`/product/${product._id}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                width="100%"
                objectFit="cover"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.countInStock > 0 ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>In Stock</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'normal' }}>Out of Stock</span>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </LinkContainer>
          <CardActions style={{ justifyContent: 'space-between' }}>
            <LinkContainer to='/cart'>
            <CartButton product = {product} size="small" color="primary">
              Add to Cart
            </CartButton>
            </LinkContainer>
            <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
              <IconButton onClick={handleFavoriteClick}>
                <FavoriteIcon style={{ color: isFavorite ? 'red' : 'inherit' }} />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </AnimatedCard>
    </div>
  );
};

export default ProductCard;
