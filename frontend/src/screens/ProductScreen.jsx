import {useGetProductByIdQuery} from '../slices/productsApiSlice';
import {useParams} from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { Card, Paper, Typography , Grid } from '@mui/material';
import CartButton from '../components/CartButton';


const ProductScreen = () => {
    const { id: productId } = useParams();
    const { data, isLoading, error } = useGetProductByIdQuery(productId);
    console.log(data);
  return (
    <div>
        <h2 style={{padding: '10px', textAlign :'center'}}>Hi</h2>
        {isLoading ? (<Loader />) : error ? (<h3>{<Loader />}</h3>) : (
        <>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <img src={data.image} alt="Product" style={{ width: '100%', height: '100%' }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper style={{ height: '100%' }}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
            <Grid item>
              <Typography variant="h5">{data.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{data.description}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Price: ${data.price}</Typography>
            </Grid>
            <Grid item>
                {data.countInStock > 0 ? <Typography variant="body2" style={{color: 'green'}}>In Stock</Typography> : <Typography variant="body2" style={{color: 'red'}}>Out of Stock</Typography>}
            </Grid>
            <Grid item>
              <CartButton />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
        </>
        )
    }
    </div>
  )
}

export default ProductScreen
