import { Box, Heading } from '@hope-ui/core';
import { Title } from 'solid-start';
import { HttpStatusCode } from 'solid-start/server';
import { log } from '~/lib/core/utils';

export default function NotFound() {
  if (import.meta.env.DEV && !import.meta.env.SSR) log('<NotFound>');
  return (
    <>
      <HttpStatusCode code={404} />
      <Title>Not Found</Title>
      <Box as="main" textAlign="center">
        <Heading level={1} fontSize="25vw">
          404
        </Heading>
        <Heading level={2} fontSize={{ base: '2xl', sm: '4xl', md: '6xl', xl: '7xl' }}>
          Page Not Found
        </Heading>
      </Box>
    </>
  );
}
