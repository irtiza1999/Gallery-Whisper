import { useEffect } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice.js';
import { useSelector } from 'react-redux';

const MyOrderScreen = () => {
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo?._id;
  const { data: orders, refetch, isLoading, isError, error } = useGetMyOrdersQuery({userId});
  console.log(orders);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Grid container spacing={2} style={{paddingTop:'40px'}}>
      <Grid item xs={12}>
        <Typography variant="h3" style={{padding:'20px'}}>My Orders</Typography>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message>{error?.message}</Message>
        ) : !orders || orders.length === 0 ? (
          <Message>No orders found.</Message>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Total Price</b></TableCell>
                  <TableCell><b>Payment Status</b></TableCell>
                  <TableCell><b>Delivery Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders && orders.map((order) => (
                    <>
                  <TableRow key={order._id}>
                    <LinkContainer to={`/order/${order._id}`} style={{ cursor: 'pointer', color: 'blue' }}>
                      <TableCell><b>{order._id}</b></TableCell>
                    </LinkContainer>
                    <TableCell>${order.totalPrice}</TableCell>
                    {order.isPaid ? (
                      <TableCell>
                        <b style={{ color: 'green' }}>
                          Paid at :{' '}
                        </b>
                        {new Date(order.paidAt).toLocaleString()}
                      </TableCell>
                    ) : (
                      <TableCell style={{ color: 'red' }}><b>Not Paid</b></TableCell>
                    )}

                    {order.isPaid && !order.isDelivered ? (
                      <TableCell>
                        <b style={{ color: 'red' }}>
                          Not Delivered
                        </b>
                      </TableCell>
                    ) : !order.isPaid ? (
                      <TableCell style={{ color: 'red' }}><b>Not Delivered</b></TableCell>
                    ) : (
                      <TableCell style={{ color: 'green' }}><b>Delivered</b></TableCell>
                    )}
                  </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default MyOrderScreen;
