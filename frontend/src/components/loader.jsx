import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function FullScreenCircularProgress() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <CircularProgress disableShrink />
    </div>
  );
}
