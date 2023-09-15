import { Link } from '@solidjs/router';
import { Typography } from '@suid/material';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={`https://${import.meta.env.VITE_BASE_URL}/`}>
        {import.meta.env.VITE_APP_NAME}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
