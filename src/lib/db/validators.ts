// validate usernames
export const validateUsername = function (username: unknown) {
  // load env vars
  const USERNAME_LENGTH_MIN: number = parseInt(
    import.meta.env.VITE_USERNAME_LENGTH_MIN
  );
  const USERNAME_LENGTH_MAX: number = parseInt(
    import.meta.env.VITE_USERNAME_LENGTH_MAX
  );
  // check min length
  if (typeof username !== 'string' || username.length < USERNAME_LENGTH_MIN) {
    return `Usernames must be at least ${USERNAME_LENGTH_MIN} characters long`;
  }
  // check max length
  if (typeof username !== 'string' || username.length > USERNAME_LENGTH_MAX) {
    return `Usernames cannot be longer than ${USERNAME_LENGTH_MAX} characters long`;
  }
};

// validate passwords
export const validatePassword = function (password: unknown) {
  // load env vars
  const PASSWORD_LENGTH_MIN: number = parseInt(
    import.meta.env.VITE_PASSWORD_LENGTH_MIN
  );
  const PASSWORD_LENGTH_MAX: number = parseInt(
    import.meta.env.VITE_PASSWORD_LENGTH_MAX
  );
  // check min length
  if (typeof password !== 'string' || password.length < PASSWORD_LENGTH_MIN) {
    return `Passwords must be at least ${PASSWORD_LENGTH_MIN} characters long`;
  }
  // check max length
  if (typeof password !== 'string' || password.length > PASSWORD_LENGTH_MAX) {
    return `Passwords cannot be longer than ${PASSWORD_LENGTH_MAX} characters long`;
  }
};
