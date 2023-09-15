import { reporter, ValidationMessage } from '@felte/reporter-solid';
import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Link as Anchor } from '@solidjs/router';
import { LockOutlined } from '@suid/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@suid/material';
import { Component, For } from 'solid-js';
import { InferType } from 'yup';
import { FormMessage } from '~/components';
import { AuthRegister, Copyright, useAuth } from '~/features';
import { schemaRegisterUser } from './schemas';

const SignUp: Component = () => {
  const [, authActions] = useAuth();
  const { form } = createForm<InferType<typeof schemaRegisterUser>>({
    extend: [reporter, validator({ schema: schemaRegisterUser })],
    onSubmit: async (values) => {
      if (values.password !== values.password_conf) {
        throw new Error('Passwords do not match');
      }
      authActions.register({
        name: values.name,
        email: values.email,
        password: values.password
      } as AuthRegister);
    }
  });

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          {/* @ts-ignore. */}
          <form use:form>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              name="name"
              autoComplete="name"
              label="Your Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <ValidationMessage for="username">
              {(messages) => (
                <For each={messages}>
                  {(message: string) => <FormMessage warning={message} />}
                </For>
              )}
            </ValidationMessage>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <ValidationMessage for="email">
              {(messages) => (
                <For each={messages}>
                  {(message: string) => <FormMessage warning={message} />}
                </For>
              )}
            </ValidationMessage>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <ValidationMessage for="password">
              {(messages) => (
                <For each={messages}>
                  {(message: string) => <FormMessage warning={message} />}
                </For>
              )}
            </ValidationMessage>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password_conf"
              label="confirm password"
              type="password"
              id="password_conf"
            />
            <ValidationMessage for="password_conf">
              {(messages) => (
                <For each={messages}>
                  {(message: string) => <FormMessage warning={message} />}
                </For>
              )}
            </ValidationMessage>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link as={Anchor} href="/login" variant="body2">
                  {'Have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignUp;
