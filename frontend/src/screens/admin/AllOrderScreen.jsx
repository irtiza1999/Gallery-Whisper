import { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice.js';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { useMarkAsDeliveredMutation } from '../../slices/ordersApiSlice.js';

const AllOrderScreen = () => {
  const { data: orders, refetch, isLoading, error } = useGetAllOrdersQuery();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    refetch();
  }, []);

  const [deliverOrder, { isLoading: loadingDeliver }] = useMarkAsDeliveredMutation();

  const deliverHandler = async (orderId) => {
    await deliverOrder({orderId});
    refetch();
  };

  return (
    <div style={{ paddingTop: '40px' }}>
      <Typography variant="h3">All Orders</Typography>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : orders && orders.length === 0 ? (
        <Message>No orders found.</Message>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Delivery Status</TableCell>
                <TableCell>Update Delivery Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.map((order) => (
                <TableRow key={order._id}>
                  <LinkContainer to={`/order/${order._id}`} style={{ cursor: 'pointer', color: 'blue' }}>
                    <TableCell><b>{order._id}</b></TableCell>
                  </LinkContainer>
                  <TableCell>{order.user.name}</TableCell>
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
                  ):
                  (
                      order.isPaid && order.isDelivered && (
                        <TableCell style={{ color: 'green' }}><b>Delivered</b></TableCell>
                      )
                    )}

                  {order.isPaid && !order.isDelivered ? (
                    <TableCell>
                      <Button
                        type='button'
                        className='btn btn-block'
                        variant='info'
                        onClick={() => deliverHandler(order._id)}
                      >
                        Mark as Delivered
                      </Button>
                    </TableCell>
                  )
                    : order.isPaid && order.isDelivered ?(
                      <TableCell>
                        <Button
                          type='button'
                          className='btn btn-block'
                          variant='success'
                          disabled>
                          Delivered
                          </Button>
                          </TableCell>
                          )
                        : (
                          <TableCell>
                            <Button
                              type='button'
                              className='btn btn-block'
                              variant='danger'
                              disabled>
                                Not Paid
                                </Button>
                                </TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </div>
  );
};

export default AllOrderScreen;
