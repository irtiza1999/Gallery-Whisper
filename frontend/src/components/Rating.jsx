import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating({ read, value }) {
  return (
    <Stack spacing={1}>
      {!read ? (
        <Rating name="half-rating-read" defaultValue={value} precision={0.5} readOnly />
      ) : (
        <Rating name="half-rating" defaultValue={value} precision={0.5} />
      )}
    </Stack>
  );
}
