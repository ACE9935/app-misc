'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactElement } from 'react'

const SessionProviderx = ({ children }:{children:ReactElement}) => {
  return (<SessionProvider>{children}</SessionProvider>)
}

export default SessionProviderx