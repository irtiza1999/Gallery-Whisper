import { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import { useGetAllUsersQuery, useMakeAdminMutation, useRemoveAdminMutation } from '../../slices/userApiSlice.js';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import Grid from '@mui/material/Grid';
import {toast} from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

const AllOrderScreen = () => {
    const { userInfo } = useSelector(state => state.auth);
  const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();
  const [makeAdmin, adminIsLoading] = useMakeAdminMutation();
  const [removeAdmin, removeAdminLoading] = useRemoveAdminMutation();


  useEffect(() => {
    refetch();
  }, []);

  const handleMakeAdmin = async (userId, name) => {
    if(userInfo._id === userId){
        toast.error("You cannot make yourself admin");
        return;
    }
    const res = await makeAdmin({userId});
    if(res.error) toast.error(res.error.message);
    else{
        refetch();
        toast.success(`${name} is now an admin`);
    }
  };

  const handleRemoveFromAdmin = async (userId, name) => {
    const res = await removeAdmin({userId});
    if(res.error) toast.error(res.error.message);
    else{
        refetch();
        toast.success(`${name} removed from admin`);
    }
  };

  return (
    <Grid container spacing={2}>
       <Grid item xs={2}>
        <AdminPanelScreen />
      </Grid>
      <Grid item xs={10}>
      <Typography variant="h3">All Users</Typography>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error.message}</Message>
      ) : users && users.length === 0 ? (
        <Message>No users found.</Message>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Role</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {users && users.map((user) => (
                <TableRow key={user._id}>
                    <TableCell><b>{user._id}</b></TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    {user.isAdmin ? (
                        <TableCell>
                            <Button variant="danger" 
                            onClick={()=>handleRemoveFromAdmin(user._id, user.name)}>Remove From Admin</Button>
                        </TableCell>
                    ) : (
                        <TableCell>
                            <Button variant="success" 
                            onClick={()=>handleMakeAdmin(user._id, user.name)}>Make Admin</Button>
                        </TableCell>
                    )}
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      </Grid>
    </Grid>
  );
};

export default AllOrderScreen;
