import '../styles/globals.css'
import '../vars.css'
import type {AppProps} from 'next/app'
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@suiet/wallet-kit/style.css";
import dynamic from 'next/dynamic';
import { ZkLoginSessionProvider } from "@shinami/nextjs-zklogin/client";

function MyApp({Component, pageProps}: AppProps) {
  
  const SuiWalletProvider = dynamic(() => import("../providers/WalletProvider"), {
    ssr: false,
  });

const queryClient = new QueryClient({
});

  return (
        <QueryClientProvider client={queryClient}>
             <SuiWalletProvider>
              <ZkLoginSessionProvider>
          <div className={"customBackground"}>
            <Navbar/>
            <Component {...pageProps} />
          </div>
          </ZkLoginSessionProvider>
          </SuiWalletProvider>
        </QueryClientProvider>
  )
}

export default MyApp