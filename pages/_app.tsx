import '../styles/globals.css'
import '../vars.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import theme from '../styles/Theme';
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

function MyApp({Component, pageProps}: AppProps) {

const queryClient = new QueryClient({
defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

  return (
      <ChakraProvider theme={theme}>
            <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <div className={"customBackground"}>
            <Navbar/>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
        </WalletProvider>>
      </ChakraProvider>
  )
}

export default MyApp