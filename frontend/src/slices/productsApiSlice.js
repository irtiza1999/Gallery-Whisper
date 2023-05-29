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
        getProductByFilter: builder.query({
            query: (filter) => ({
                url: `${PRODUCT_URL}/filter/${filter}`,
            }),
        }),
        
    })
    
})

export const { useGetAllProductQuery, useGetProductByIdQuery, 
    useGetCategoryQuery, useGetCategoryProductsQuery, 
    useGetProductByFilterQuery,
 } = productsApiSlice;
export default productsApiSlice ;