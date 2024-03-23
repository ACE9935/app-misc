import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import {ThemeProvider} from '@mui/material/styles';
import theme from "@/theme/theme";
import PageWrapper from "@/components/layout/PageWrapper";
import PlayBar from "@/components/song-player/PlayBar";
import {store} from '@/app-state/app-store'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import SessionProviderx from "@/components/provider/SessionProviderx";
import QueryProvider from "@/components/provider/QueryProvider";
import StateProvider from "@/components/provider/StateProvider";
import Chakra from "@/components/provider/Chakra";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(
  { params, searchParams }: {
    params: { genre: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
) {
  const state = store.getState();

  return ({
    title: "Misc",
    description: "Misc website, welcome!",
    icons: {
      icon: '/metax.png',
    },
  })
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const state=store.getState()
  return (
    <html
      lang='en'
      className={`${inter.className} h-full scroll-smooth antialiased`}
    >
      <body className='flex h-full flex-col bg-slate-100'>
    <AppRouterCacheProvider>
      <QueryProvider>
      <SessionProviderx>
    <StateProvider>
    <ThemeProvider theme={theme}>
      <PageWrapper>
      <PlayBar/>
      <Chakra>
    {children}
    </Chakra>
    </PageWrapper>
    </ThemeProvider>
    </StateProvider>
    </SessionProviderx>
    </QueryProvider>
    </AppRouterCacheProvider>
    </body>
    </html>
  )
}
