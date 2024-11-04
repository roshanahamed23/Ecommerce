  import connectDB from '@/lib/db';
  import NextAuth from 'next-auth';
  import bcrypt from 'bcryptjs';
  import User from '@/modals/User';
  import Credentials from 'next-auth/providers/credentials';
  import { MongoDBAdapter } from '@auth/mongodb-adapter';
  import client from '@/lib/mongoclient';
  import { v4 as uuid } from 'uuid';

  const adapter = MongoDBAdapter(client);

  const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      Credentials.default({
        id: 'credentials',
        name: 'Credentials',
        type: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
          await connectDB();
          const user = await User.findOne({
            email: credentials?.email,
          }).select('+password');

          if (!user) throw new Error('Wrong Email');

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) throw new Error('Wrong Password');
          return user; // This user object will be saved in the session.
        },
      }),
    ],
    adapter: adapter,
    callbacks: {
      async jwt({ token, user, account }) {
        console.log(account);
        if (account?.provider === 'credentials') {
          token.credentials = true; // Flag indicating credentials were used for login
        }
        return token;
      },
    },
    jwt: {
      encode: async (params) => {
        if (params.token?.credentials) {
          const sessionToken = uuid(); // Generate a unique session token
          console.log(params.token);
          if (!params.token.sub) {
            throw new Error('No user ID found in token');
          }

          const createdSession = await adapter?.createSession?.({
            sessionToken: sessionToken,
            userId: params.token.sub,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          });

          if (!createdSession) {
            throw new Error('Failed to create session');
          }

          return sessionToken; // Return the newly created session token
        }
        return defaultEncode(params); // Use the default encoding if not using credentials
      },
      decode: async (params) => {
        if (params.token?.credentials) {
          const session = await adapter?.getSession?.(params.token);
          if (!session || session.expires < new Date()) {
            throw new Error('invalid or expired session token');
          }
          return session;
        }
        return defaultDecode(params);
      },
    },
  };

  const handlers = NextAuth.default(authOptions);
  export { handlers as GET, handlers as POST };
