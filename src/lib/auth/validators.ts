export const validateUsername = function (username: unknown) {
  const USERNAME_LENGTH_MIN: number = parseInt(
    import.meta.env.VITE_USERNAME_LENGTH_MIN
  );
  const USERNAME_LENGTH_MAX: number = parseInt(
    import.meta.env.VITE_USERNAME_LENGTH_MAX
  );
  if (typeof username !== 'string' || username.length < USERNAME_LENGTH_MIN) {
    return `Usernames must be at least ${USERNAME_LENGTH_MIN} characters long`;
  }
  if (typeof username !== 'string' || username.length > USERNAME_LENGTH_MAX) {
    return `Usernames cannot be longer than ${USERNAME_LENGTH_MAX} characters long`;
  }
};

export const validatePassword = function (password: unknown) {
  const PASSWORD_LENGTH_MIN: number = parseInt(
    import.meta.env.VITE_PASSWORD_LENGTH_MIN
  );
  const PASSWORD_LENGTH_MAX: number = parseInt(
    import.meta.env.VITE_PASSWORD_LENGTH_MAX
  );
  if (typeof password !== 'string' || password.length < PASSWORD_LENGTH_MIN) {
    return `Passwords must be at least ${PASSWORD_LENGTH_MIN} characters long`;
  }
  if (typeof password !== 'string' || password.length > PASSWORD_LENGTH_MAX) {
    return `Passwords cannot be longer than ${PASSWORD_LENGTH_MAX} characters long`;
  }
};
