import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),

        addFavorite: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/favorite`,
                method: 'PUT',
                body: data,
            }),
        }),

        getFavorite: builder.query({
            query: () => ({
                url: `${USERS_URL}/favorite`,
            }),
        }),
    })
    
})

export const { useLoginMutation,
     useLogoutMutation, 
     useRegisterMutation, 
     useUpdateUserMutation,
     useAddFavoriteMutation,
     useGetFavoriteQuery,
 } = usersApiSlice;