import { UserType } from "@/app/api/models"
import NextAuth, { DefaultSession } from "next-auth"
import { Session } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"



declare module "next-auth" {

  interface User {
            _id:string
            email:string
            name:string
            image:string
            access:string
  }

  interface Session {
    user: {
            _id:string
            email:string
            name:string
            image:string
            access:string
            infos:UserType
    }
    error:string
  }

}

export { Session }
