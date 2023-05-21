import { apiSlice } from "./apiSlice";

const PRODUCT_URL = '/api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}`,
            })
        }),
        getCategory: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/category`,
            })
        }),
        getCategoryProducts: builder.query({
            query: (cat) => ({
                url: `${PRODUCT_URL}/category/${cat}`,
            })
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            })
        }),
    })
    
})

export const { useGetAllProductQuery, useGetProductByIdQuery, useGetCategoryQuery, useGetCategoryProductsQuery } = productsApiSlice;
export default productsApiSlice ;