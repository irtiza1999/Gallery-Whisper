import { apiSlice } from "./apiSlice";

const ORDER_URL = '/api/orders';
const PAYPAL_URL = '/api/config/paypal';


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDER_URL}`,
                method: 'POST',
                body: order,
            }),
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `${ORDER_URL}/${orderId}`,
            }),
        }),

        getPaypalClientId : builder.query({
            query: () => ({
                url: `${PAYPAL_URL}`,
            }),
        }),

        payOrder : builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDER_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
            }),
        }),

        markAsDelivered : builder.mutation({
            query: ({ orderId }) => ({
                url: `${ORDER_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
}),
})

export const { useCreateOrderMutation, useGetOrderByIdQuery, useGetPaypalClientIdQuery,
    usePayOrderMutation, useMarkAsDeliveredMutation } = ordersApiSlice;