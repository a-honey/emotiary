// import passport from "passport";
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { PrismaClient, User } from '@prisma/client';
// const prisma = new PrismaClient();
// export default () => {
//     passport.use(
//       new GoogleStrategy(
//         {
//           clientID: process.env.GOOGLE_ID || '',
//           clientSecret: process.env.GOOGLE_PASSWORD || '',
//           callbackURL: '/auth/google/callback',
//         },
//         async (accessToken, refreshToken, profile, done) => {
//           console.log('google profile : ', profile);
//           try {
//             const exUser = await prisma.user.findUnique({
//               where: { snsId: profile.id, provider: 'google' },
//             });
//             if (exUser) {
//               done(null, exUser);
//             } else {
//               const newUser = await prisma.user.create({
//                 data: {
//                   email: profile?.emails?.[0]?.value || '',
//                   username: profile.displayName || '',
//                   id: profile.id,
//                   provider: 'google',
//                 },
//               });
//               done(null, newUser);
//             }
//           } catch (error) {
//             console.error(error);
//             done(error);
//           }
//         },
//       ),
//     );
//   };
//# sourceMappingURL=googleStrategy.js.map