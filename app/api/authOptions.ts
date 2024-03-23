
import {Session, User as Userx} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import database from "./database";
import { Appuser } from "./models";
import { sendVerificationRequest } from "@/utils/sendVerificationRequest";
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from "@/mongo/client";

async function refreshAccessToken(tokenObject:any) {
    try{
      console.log('Refreshing access token...')
      const email=tokenObject.refreshToken
      const user=await Appuser.findOne({email:email,access:{ $in : ["allowed"]}})
    
      if(user) {return {
          ...tokenObject,
          accessTokenExpiry: Date.now()+(1000*60*60),
      }}
      else return null
    } catch (error) {
      console.log(error)
  
      return null
  }
   }
  
  export const authOptions: any = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
      strategy: "jwt",
    },
    pages:{
      signIn:"/signin"
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      {
        id: 'resend',
        type: 'email',
        sendVerificationRequest
      },
    ],
  
    callbacks: {
      async signIn({ user, account }:{user:any,account:any}) {
         console.log('INITIATING')
          const { name, email,image } = user;
          const userExists = await Appuser.findOne({ email },{_id:0});
          try {
            await database();
  
            if(userExists && userExists.access=="unallowed") return false
            if (!userExists) {
              const newUser = new Appuser({
                name,
                email,
                image,
              });
              await newUser.save();
            }
          } catch (error) {
            console.log(error);
          }
    
        return user;
      },
      jwt: async ({ token, user }:{token:JWT | any,user?: Userx | AdapterUser | undefined}) => {
          console.log("Authenticating...")
          if (user) {
          
              token.accessToken = user
              token.accessTokenExpiry = Date.now()+(1000*60*60)
              token.refreshToken = user.email
          }
  
          const shouldRefreshTime = Math.round(token.accessTokenExpiry - Date.now());
        
          if (shouldRefreshTime > 0) {
              return Promise.resolve(token);
          }
        
          token = await refreshAccessToken(token);
          return token;
      },
      async session({ session, token }:{session:Session,token:any}) {
          const userExists = await Appuser.findOne({ email:token.accessToken.email });
          session.user = {...token.accessToken,image:token.accessToken.image||"/user.png",name:token.accessToken.name||userExists.name}
          session.error = token?.error
          if(userExists && userExists.access!="unallowed") session.user.infos=userExists
  
          return session
        },
    },
  };