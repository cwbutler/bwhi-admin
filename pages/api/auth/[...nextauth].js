import CognitoProvider from "next-auth/providers/cognito"
import NextAuth from "next-auth"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
        })
    ],
    pages: {
        signIn: '/signin'
    },
    debug: process.env.NODE_ENV !== 'production'
});
