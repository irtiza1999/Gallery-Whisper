import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";
import Formcontainer from "../../components/Formcontainer";
import {toast} from 'react-toastify'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Grid from '@mui/material/Grid';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import {useCreateProductMutation} from '../../slices/productsApiSlice';

const AdminAddProductScreen = () => {
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [artists, setArtists] = useState('');
    const [styles, setStyles] = useState('');
    const [subject, setSubject] = useState('');
    const [medium, setMedium] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState('');

    const handleClose = () => {
        setShow(false);
        setProductId('');
        setName('');
        setSize('');
        setDescription('');
        setCategory('');
        setArtists('');
        setStyles('');
        setSubject('');
        setMedium('');
        setPrice('');
        setCountInStock('');
        setImage('');
  };
    const navigate = useNavigate();
    
    const [createProduct, { isLoading: isLoadingCreate, error: errorCreate }] = useCreateProductMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            const res = await createProduct({name, size, description, category, 
                artists, styles, subject, medium, price, countInStock, image}).unwrap();
            if(res){
                navigate("/admin/productslist");
                toast.success('Product added successfully');
                handleClose();
            }
        }catch(err){
            toast.error(err?.data?.message || err?.error);
        }
    };

    return (
        <Grid container spacing={6}>
            <Grid item xs={2}>
                <AdminPanelScreen />
            </Grid>
        <Grid item xs={12}>
        <Formcontainer>
            <h1>Add Product</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className = 'my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter Name' value={name} 
            onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='size'>
            <Form.Label>Size</Form.Label>
            <Form.Control type='text' placeholder='Enter Size' value={size}
            onChange={(e) => setSize(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Enter Description' value={description}
            onChange={(e) => setDescription(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' placeholder='Enter Category' value={category}
            onChange={(e) => setCategory(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='artists'>
            <Form.Label>Artists</Form.Label>
            <Form.Control type='text' placeholder='Enter Artists' value={artists}
            onChange={(e) => setArtists(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='styles'>
            <Form.Label>Styles</Form.Label>
            <Form.Control type='text' placeholder='Enter Styles' value={styles}
            onChange={(e) => setStyles(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='subject'>
            <Form.Label>Subject</Form.Label>
            <Form.Control type='text' placeholder='Enter Subject' value={subject}
            onChange={(e) => setSubject(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='medium'>
            <Form.Label>Medium</Form.Label>
            <Form.Control type='text' placeholder='Enter Medium' value={medium}
            onChange={(e) => setMedium(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='text' placeholder='Enter Price' value={price}
            onChange={(e) => setPrice(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type='text' placeholder='Enter Count In Stock' value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}>
            </Form.Control>
        </Form.Group>
        <Form.Group className = 'my-2' controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Enter Image' value={image}
            onChange={(e) => setImage(e.target.value)}>
            </Form.Control>
        </Form.Group>
            <Button type='submit' variant='success' className='mt-3'>Confirm</Button>
        </Form>
        </Formcontainer>
        </Grid>
        </Grid>
  )
}

export default AdminAddProductScreen
