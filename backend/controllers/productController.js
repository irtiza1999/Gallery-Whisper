import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// get all product public
const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
});


// get a product public
const getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById( productId );
    if(product){
        res.status(200).json(product);

    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

// get all Unique Categories public
const getUniqueCategories = asyncHandler(async (req, res) => {
    const categories = await Product.distinct('category');
    res.status(200).json(categories);
  });

// get a product from a category public
const getCategoryProducts = asyncHandler(async (req, res) => {
    const category = req.params.myCategory;
    const products = await Product.find({ category });
    if (products.length === 0) {
      res.status(404);
      throw new Error('No products found');
    } else {
      res.status(200).json(products);
    }
  });


//post a product private admin
const createProduct = asyncHandler(async (req, res) => {
    const {name,description,category,price,countInStock,image} = req.body;
    const product = await Product.findOne({ name });
    if(product){
        res.status(400);
        throw new Error('Product already exists');
    }
    else{
        const newProduct = await Product.create({
            name,
            description,
            category,
            price,
            countInStock,
            image
        });
        if(newProduct){
            res.status(201).json({
                _id : product._id,
                name : product.name,
                description : product.description,
                category : product.category,
                price : product.price,
                countInStock : product.countInStock,
                image : product.image
            });
        }else{
            res.status(400);
            throw new Error('Invalid product data');
        }
    
    }
        
});

//update a product private admin
const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.price = req.body.price || product.price;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.image = req.body.image || product.image;
        
        const updatedProduct = await product.save();
        res.status(200).json({
            _id : updatedProduct._id,
            name : updatedProduct.name,
            description : updatedProduct.description,
            category : updatedProduct.category,
            price : updatedProduct.price,
            countInStock : updatedProduct.countInStock,
            image : updatedProduct.image
        });
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});

//delete a product private admin
const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const deletedProduct = await Product.deleteOne({ _id: productId });
    if(deletedProduct){
        res.status(200).json({message: 'Product removed'});
    }else{
        res.status(404);
        throw new Error('Product not found');
    }
});




export {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getUniqueCategories,
    getCategoryProducts
};