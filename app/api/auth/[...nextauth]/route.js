import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import KakaoProvider from "next-auth/providers/kakao"

export const authOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "user name" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                console.log("---------------------------1")
                console.log(credentials)

                const res = await fetch("http://localhost:8080/api/accounts/signin", {
                    method: 'POST',
                    body: JSON.stringify({ username: credentials.username, password: credentials.password }),
                    headers: { "Content-Type": "application/json" }
                })

                console.log("----------------------------------2")
                console.log(res)

                const user = await res.json()
                console.log(user)

                if (res.ok && user) {
                    return user
                }

                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile }) {
            console.log('jwt..........')
            //kakao
            if (account?.provider === 'kakao' && profile) {
                const res = await fetch('http://localhost:8080/api/accounts/social', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cache-Control': 'no-store',
                    },
                    body: new URLSearchParams({ email: profile.kakao_account.email })
                });

                const result = await res.json()

                token.id = result.email;
                token.role = result.role;
                token.email = result.email;
                token.name = result.nickname;

                token.accessToken = result.accessToken;
                token.refreshToken = result.refreshToken;
                token.accessTokenExpires = Date.now() + (1000 * 60 * 60) //1h

                return token;
            }
            //자체 로그인
            if (account?.provider === 'credentials') {

                if (user) {  // 로그인시 user 속성이 있음
                    token.id = user.email;
                    token.role = user.role; // 예를 들어, 사용자의 역할(Role)을 JWT에 포함
                    token.email = user.email;
                    token.name = user.nickname;

                    token.accessToken = user.accessToken;
                    token.refreshToken = user.refreshToken;
                    token.expireTime = Date.now() + (1000 * 60 * 60) //1h
                }
            }    
            return token;        
        },

        async session({ session, token }) {
            console.log('session.......')
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.email = token.email;
            session.user.name = token.name;

            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.expireTime = token.expireTime;
            return session;
        },
    },
    pages: {
        signIn: '/account/signin',
        signOut: '/account/signout'
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };