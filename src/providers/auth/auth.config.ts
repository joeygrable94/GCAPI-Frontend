import Auth0Provider from '@auth/core/providers/auth0';
import type { SolidAuthConfig } from '@solid-mediakit/auth';

export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH_AUTH0_ID,
      clientSecret: process.env.AUTH_AUTH0_SECRET,
      issuer: process.env.AUTH_AUTH0_ISSUER,
      authorization: {
        params: {
          audience: process.env.AUTH_AUTH0_AUDIENCE,
          scope: process.env.AUTH_AUTH0_SCOPE,
          response_type: 'code'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account?.access_token;
        token.refreshToken = account?.refresh_token;
      }
      return token;
    },
    async session({ token, session }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      };
    }
  }
} satisfies SolidAuthConfig;
