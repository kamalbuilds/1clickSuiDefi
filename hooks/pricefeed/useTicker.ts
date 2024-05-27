
import { useQuery } from "@tanstack/react-query";
import { getPrices } from "../../protocolstrategies/utils/priceFeed/getPrices";

const useTicker = () => {
  const { data: cryptosPriceData, refetch: refetchCryptosPrices } = useQuery({
    queryKey: ["getPrices"],
    queryFn: () => getPrices(),
    refetchInterval: 10 * 1000,
  });

  return { cryptosPriceData, refetchCryptosPrices };
};

export { useTicker };
