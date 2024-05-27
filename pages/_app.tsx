import '../styles/globals.css'
import '../vars.css'
import type {AppProps} from 'next/app'
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import dynamic from 'next/dynamic';


function MyApp({Component, pageProps}: AppProps) {
  
  const SuiWalletProvider = dynamic(() => import("../providers/WalletProvider"), {
    ssr: false,
  });

const queryClient = new QueryClient({
defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

  return (
        <QueryClientProvider client={queryClient}>
             <SuiWalletProvider>
          <div className={"customBackground"}>
            <Navbar/>
            <Component {...pageProps} />
          </div>
          </SuiWalletProvider>
        </QueryClientProvider>
  )
}

export default MyApp