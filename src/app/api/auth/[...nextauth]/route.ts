import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        return {
          id: "user-" + Date.now(),
          name: credentials.email.split("@")[0] || "RAIB Customer",
          email: credentials.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const customDomain = "https://raib.site";
      if (url.startsWith("/")) return `${customDomain}${url}`;
      else if (new URL(url).origin === new URL(customDomain).origin) return url;
      return customDomain;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "raib_super_secret_key_2026",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
