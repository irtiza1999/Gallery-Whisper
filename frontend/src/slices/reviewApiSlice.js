import { apiSlice } from "./apiSlice";

const REVIEW_URL = '/api/reviews';

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (review) => ({
                url: `${REVIEW_URL}`,
                method: 'POST',
                body: review,
            }),
        }),
        getReview: builder.query({
            query: (productId) => ({
                url: `${REVIEW_URL}/${productId}`,
            }),
        }),
    })
})
export const { useCreateReviewMutation, useGetReviewQuery } = reviewApiSlice;
export default reviewApiSlice;