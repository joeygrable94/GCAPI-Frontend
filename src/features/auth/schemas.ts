import { object, string } from 'yup';

/**
 * @example A5df@sdf
 */
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{3,}$/;

export const schemaRegisterUser = object({
  name: string().optional(), // full name
  username: string().required('Please enter a username.'), // username
  email: string()
    .required('Please your email.')
    .email('Please enter a valid email address.'),
  password: string()
    .required('Please enter a password.')
    .test('is-secure', 'Your password is not secure.', (value) => {
      if (value.length < 8) return false;
      return STRONG_PASSWORD.test(value);
    }),
  password_conf: string()
    .required('Please confirm your password.')
    .test('passwords-match', 'Your passwords must match.', function (value) {
      return this.parent.password === value;
    })
});
