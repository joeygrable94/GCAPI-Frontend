import { Title } from '@solidjs/meta';
import { Box, Typography } from '@suid/material';
import { Component } from 'solid-js';

const NotFound: Component = () => {
  return (
    <>
      <Title>Not Found</Title>
      <Box as="main" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: '33vw',
              lg: '20vw'
            }
          }}
        >
          404
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: {
              xs: '6vw',
              lg: '3vw'
            }
          }}
        >
          Page Not Found
        </Typography>
      </Box>
    </>
  );
};

export default NotFound;
