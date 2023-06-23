import { apiSlice } from "./apiSlice";

const ARTIST_URL = '/api/artist';

export const artistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArtistByName: builder.query({
            query: (name) => ({
                url: `${ARTIST_URL}/${name}`,
            }),
        }),
        
        getAllArtist: builder.query({
            query: () => ({
                url: `${ARTIST_URL}`,
            }),
        }),

        addArtist: builder.mutation({
            query: (artist) => ({
                url: `${ARTIST_URL}`,
                method: 'POST',
                body: artist,
            }),
        }),

        removeArtist: builder.mutation({
            query: (artist) => ({
                url: `${ARTIST_URL}`,
                method: 'DELETE',
                body: artist,
            }),
        }),

        updateArtist: builder.mutation({
            query: (userId) => ({
                url: `${ARTIST_URL}/${userId}`,
                method: 'PUT',
                body: userId,
            }),
        }),
}),
})

export const {
    useGetArtistByNameQuery,
    useGetAllArtistQuery,
    useAddArtistMutation,
    useRemoveArtistMutation,

} = artistApiSlice;