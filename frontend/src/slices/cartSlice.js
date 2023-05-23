import {createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../components/cartUtil';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : localStorage.setItem('cart', JSON.stringify({cartItems: []})) || {cartItems: []};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartAdd: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
              state.cartItems = state.cartItems.map((x) =>
                x.product === existItem.product ? item : x
              );
            } else {
              state.cartItems.push(item);
            }
            return updateCart(state);
        },
        
    },
});

export const {cartAdd} = cartSlice.actions;
export default cartSlice.reducer;