import * as v from 'valibot';
import { z } from 'zod';

export const SValidAuthReqToken = v.string([v.toMinValue('')]);
export const SValidEmail = v.string([v.email('The email address is badly formatted.')]);
export const SValidPassword = v.string([
  v.minLength(8, 'Your password must have 8 characters or more.')
]);
export const SValidAuthScope = v.string([v.minValue('openid profile email')]);

/*
export const SValidAuthReqToken = v.pipe(v.string(), v.trim(), v.toMinValue(''));

export const SValidEmail = v.pipe(
  v.string('Your email must be a string.'),
  v.trim(),
  v.nonEmpty('Please enter your email.'),
  v.email('The email address is badly formatted.')
);

export const SValidPassword = v.pipe(
  v.string('Your password must be a string.'),
  v.trim(),
  v.nonEmpty('Please enter your password.'),
  v.minLength(8, 'Your password must have 8 characters or more.')
);

export const SValidAuthScope = v.pipe(
  v.string('The provided auth scope must be a string.'),
  v.trim(),
  v.nonEmpty('Please provide an auth scope.'),
  v.minValue('openid profile email')
);
*/

export const SchemaUserLoginRequest = v.object(
  {
    auth_request_token: SValidAuthReqToken,
    email: SValidEmail,
    password: SValidPassword,
    confirm_password: SValidPassword,
    auth_scope: SValidAuthScope
  },
  [
    v.forward(
      v.custom((input) => {
        return input.password === input.confirm_password;
      }, 'The two passwords do not match.'),
      ['confirm_password']
    )
  ]
);

export type SFormUserLogin = v.Input<typeof SchemaUserLoginRequest>;

// ZOD

export const SchemaEditUser = z.object({
  userId: z.string({ required_error: 'Please enter a user ID.' }),
  username: z.string().nullable(),
  picture: z.string().nullable()
});

export type SEditUser = z.infer<typeof SchemaEditUser>;
