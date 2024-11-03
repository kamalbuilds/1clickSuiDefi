import styles from "../styles/action-block.module.css";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACTIONS, ActionTypes, PROTOCOLS, ProtocolNames } from '../constants/constants';
import TokenChooser from "./token-chooser";
import { IoIosAddCircleOutline, IoIosArrowDown } from "react-icons/io";
import { SELECTABLE_TOKENS } from "../constants/constants";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue } from "framer-motion"
import { SUITOKENS } from "../constants/Suitokens";
import { Naviprotocol } from "../hooks/Naviprotocol";
import { WalletProvider, useAccounts, useSignAndExecuteTransaction, useSignTransaction, useSuiClient, useWallets } from "@mysten/dapp-kit";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { txBuild, estimateGasFee, getSmartRouting } from "@flowx-pkg/ts-sdk";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Dex } from "kriya-dex-sdk";
import { getPoolByName } from "../constants/constants";
import { Pool, PoolConfig } from "navi-sdk/dist/types";
import { processAmount, refineAmount } from "@/helpers";
import { Aftermath, AftermathApi, IndexerCaller, Router, RouterCompleteTradeRoute } from "aftermath-ts-sdk";
import { AggregatorQuoter, Coin, GetRoutesResult, TradeBuilder, Route } from '@flowx-finance/sdk';
import { useWalrus } from '@/hooks/useWalrus';
import { type ActionBlock, type Strategy } from '@/types/strategy';
import { v4 as uuidv4 } from 'uuid';

async function simulateFlowxGivenAmountIn(
  coinInType: string,
  coinOutType: string,
  amountIn: bigint,
) {
  const quoter = new AggregatorQuoter("mainnet");
  return await quoter.getRoutes({
    tokenIn: coinInType,
    tokenOut: coinOutType,
    amountIn: amountIn.toString(),
  });
}

async function executeFlowxSwap(
  tx: any, // here Transaction should come from @mysten/sui.js/transactions but its import is showing error
  client: any,
  inputs: {
    routes: Route<Coin, Coin>[];
    coinIn: any;
    slippage: number;
  }
) {
  const tradeBuilder = new TradeBuilder("mainnet", inputs.routes);
  const coinOut = await tradeBuilder
    .slippage(inputs.slippage)
    .build()
    .swap({
      client,
      tx,
      coinIn: inputs.coinIn,
    });

  if (!coinOut) throw new Error("Failed to build the tx from FlowX router");
  return coinOut;
}

interface ActionBlockProps {
  actionName: string;
  protocolName: string;
  onActionChange: (value: string) => void;
  onProtocolChange: (value: string) => void;
  onLockBlock: (blockData: any) => void;
}

const ActionBlock = ({
  actionName,
  protocolName,
  onActionChange,
  onProtocolChange,
  onLockBlock
}: ActionBlockProps) => {
  const x = useMotionValue(0);

  const [blockedAction, setBlockedAction] = useState(false);

  const [currentActionName, setCurrentActionName] = useState(actionName || ACTIONS['ADD_LIQUIDITY'].type);
  const [currentProtocolName, setProtocolName] = useState(protocolName || PROTOCOLS['KRIYADEX'].name);

  const [selectedTokenFrom, setSelectedTokenFrom] = useState<any>(SELECTABLE_TOKENS[0]);
  const [selectedTokenTo, setSelectedTokenTo] = useState<any>(SELECTABLE_TOKENS[1]);

  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const [sellAmount, setSellAmount] = useState<number>();
  const [quote, setQuote] = useState<string>();


  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const suiclient = useSuiClient();
  console.log(suiclient, "sui client ")
  const accounts = useAccounts();
  const wallet = accounts[0]?.address;
  // console.log(wallet, "wealle")

  // console.log(currentActionName, "current action name")
  const [lockedBlocks, setLockedBlocks] = useState<ActionBlock[]>([]);

  const abortQuerySmartRef = useRef(new AbortController());
  const [batchActions, setBatchActionsState] = useState<ActionBlock[]>([]);

  const handleLockBlock = () => {
    if (!selectedTokenFrom || !selectedTokenTo || !sellAmount) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    const blockData = {
      id: Date.now(),
      protocolName: currentProtocolName,
      actionName: currentActionName,
      tokenFrom: selectedTokenFrom,
      tokenTo: selectedTokenTo,
      amount: sellAmount,
      quote: quote
    };

    onLockBlock(blockData);
    setSuccessMessage('Block locked successfully');
    setBlockedAction(true);
  };

  const handleGetLockedBlocksData = () => {
    // Use lockedBlocks array to access all the locked blocks' data
    console.log("Locked Blocks Data:", lockedBlocks);
  };

  const handleActionChange = (value) => {
    setCurrentActionName(value);
  };

  const availableProtocols = useMemo(() => {
    const action = ACTIONS[currentActionName];
    if (!action || !action.availableProtocols) return [];
    return action.availableProtocols;

  }, [currentActionName])

  const handleProtocolChange = (value) => {
    setProtocolName(value);
  };

  // Determine which token list to use based on the protocolName
  const selectableTokens = SUITOKENS;

  useEffect(() => {
    // Reset selected tokens when protocol changes
    setSelectedTokenFrom(selectableTokens[0]);
    setSelectedTokenTo(selectableTokens[1]);
  }, [protocolName, selectableTokens]);

  const handleChangeInput = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!wallet) return;
    setErrorMessage('');
    const sellAmountValue = Number(event.target.value);
    console.log("Sell Amount valueeee>>>>>", sellAmountValue, event.target.value, currentProtocolName, currentProtocolName === PROTOCOLS['NAVI'].name,);
    setSellAmount(sellAmountValue);
    if (currentProtocolName == PROTOCOLS['NAVI'].name) {

      console.log("1");
      //TODO: See if the below code works or not

      // if (selectedTokenFrom.decimals) {
      //   const sellamountbaseunit = sellAmountValue * Math.pow(10, selectedTokenFrom.decimals);

      //   fetch('/api/quote', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Accept': '*/*',
      //     },
      //     body: JSON.stringify({
      //       offer_address: selectedTokenFrom.address,
      //       ask_address: selectedTokenTo.address,
      //       units: sellamountbaseunit,
      //       slippage_tolerance: 0.001
      //     })
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       const quote = data.ask_units / Math.pow(10, selectedTokenTo.decimals);
      //       setQuote(quote.toString());
      //       console.log("quote set", data.ask_units);
      //       setLoading(false);
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error);
      //     });
      // } else {

      //   console.log(sellAmountValue, selectedTokenFrom.decimals, "sellAmountValue");
      //   fetch('/api/quote', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Accept': '*/*',
      //     },
      //     body: JSON.stringify({
      //       offer_address: selectedTokenFrom.address,
      //       ask_address: selectedTokenTo.address,
      //       units: sellAmountValue,
      //       slippage_tolerance: 0.001
      //     })
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       const quote = data.ask_units / Math.pow(10, selectedTokenTo.decimals);
      //       setQuote(quote.toString());
      //       console.log("quote set", data.ask_units);
      //       setLoading(false);
      //     })
      //     .catch((error) => {
      //       console.error('Error:', error);
      //     });
      // }
    } else if (currentProtocolName == PROTOCOLS['KRIYADEX'].name) {

      console.log("2");

      const sellAmountValue = Number(event.target.value);
      console.log("Sell Amount Value", sellAmountValue);
      if (!sellAmountValue) return

      const txb = new TransactionBlock();
      const kriyadex = new Dex("https://fullnode.mainnet.sui.io:443");

      console.log("currentActionName", currentActionName);
      console.log("currentProtocolName", currentProtocolName);
      console.log("selectedTokenFrom", selectedTokenFrom);
      console.log("selectedTokenTo", selectedTokenTo);

      const pool = getPoolByName(`${selectedTokenFrom.symbol}-${selectedTokenTo.symbol}`);
      console.log("Pool", pool);

      const inputTokenValue = processAmount(sellAmountValue.toString(), selectedTokenFrom.decimals)

      let coinX = kriyadex.getExactCoinByAmount(pool.tokenXType, coinsXlist, BigInt(sellAmountValue), txb)
      console.log("CoinX", coinX);


      // get the quote
    } else if (currentProtocolName == PROTOCOLS['AFTERMATH'].name) {

      const sellAmountValue = Number(event.target.value);
      if (!sellAmountValue) return

      const afSdk = new Aftermath("MAINNET");
      await afSdk.init();

      const router = afSdk.Router();

      const updatedSellAmountValue = processAmount(sellAmountValue.toString(), selectedTokenFrom.decimals)

      const fetchedRoute = await fetchAfterMathQuote({
        sellAmountValue: updatedSellAmountValue,
        router
      })

      console.log("Res", fetchedRoute);
      if (fetchedRoute) {
        const fetchedAmount = Number(fetchedRoute.coinOut.amount)
        const updatedFetchAmount = refineAmount(fetchedAmount.toString(), selectedTokenTo.decimals)
        setQuote(updatedFetchAmount);
      }

    } else if (currentProtocolName == PROTOCOLS['FLOWX'].name) {

      const sellAmountValue = Number(event.target.value);
      if (!sellAmountValue) return

      const quoter = new AggregatorQuoter('mainnet');

      const updatedSellAmountValue = processAmount(sellAmountValue.toString(), selectedTokenFrom.decimals)

      const routes = await fetchFlowXRoute({
        updatedSellAmountValue,
        quoter
      });

      console.log("Routes >>>", routes);
      if (!routes) {
        alert('No routes found')
        return
      }

      if (routes) {
        const fetchedAmount = Number(routes.amountOut)
        const updatedFetchAmount = refineAmount(fetchedAmount.toString(), selectedTokenTo.decimals)
        setQuote(updatedFetchAmount);
      }


    }
  };


  const handleSwap = async () => {
    if (!wallet || !sellAmount || !quote) return;
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    if (protocolName === "NAVIPROTOCOL") {


      try {

      } catch (error) {
        console.error('Error during swap:', error);
      }
    } else if (currentProtocolName === "KRIYADEX") {
      try {

        const amountinstring = sellAmount.toString();
        console.log(selectedTokenFrom.type, selectedTokenTo.type, true, "sd");
        console.log(`${selectedTokenFrom.symbol}-${selectedTokenTo.symbol}`, "pool");

        const txb: any = new TransactionBlock();
        const kriyadex = new Dex("https://fullnode.mainnet.sui.io:443");
        console.log(kriyadex, "kriyaddex")
        const to_swap_amount = 1 * 10 ** 9;
        const pool = getPoolByName(`${selectedTokenFrom.symbol}-${selectedTokenTo.symbol}`);
        const justswap = await kriyadex.swap(pool, selectedTokenFrom.type, txb.pure(sellAmount), txb.object(selectedTokenFrom.symbol), txb.pure(10 ** 9), txb);

        console.log(justswap);

        const swapcall = await txb.moveCall({
          target: "0xa0eba10b173538c8fecca1dff298e488402cc9ff374f8a12ca7758eebe830b66::spot_dex::swap_token_x",
          arguments: [
            txb.object(pool.objectId),
            txb.object(selectedTokenFrom.symbol),
            txb.pure(amountinstring),
            txb.pure(10 ** 9),
          ],
          typeArguments: [
            pool.tokenXType,
            pool.tokenYType,
          ],
        });


        signAndExecuteTransaction(
          {
            transaction: txb,
            chain: 'sui:mainnet',
          },
          {
            onSuccess: (result) => {
              console.log('executed transaction', result);
            },
          },
        );

      } catch (error) {
        console.error('Error during swap:', error);
      }
    } else if (currentProtocolName === "FLOWX") {
      console.log(selectedTokenFrom, "yoi", selectedTokenTo)




      console.log(sellAmount, "sellAmount")
      const amountinstring = sellAmount.toString();
      console.log(selectedTokenFrom.type, selectedTokenTo.type, amountinstring, abortQuerySmartRef.current.signal, true, "sd");
      const { paths, amountOut } = await getSmartRouting(selectedTokenFrom.type, selectedTokenTo.type, amountinstring, abortQuerySmartRef.current.signal, true)
      console.log(paths, amountOut, "smart router gave us");


          const txb = new TransactionBlock();
          
          // Convert sellAmount to bigint with proper decimals
          const amountIn = BigInt(processAmount(sellAmount.toString(), selectedTokenFrom.decimals));
          
          // Get routes
          const queryResult = await simulateFlowxGivenAmountIn(
            selectedTokenFrom.type,
            selectedTokenTo.type,
            amountIn
          );
  
          if (!queryResult || !queryResult.routes.length) {
            throw new Error("No routes found for swap");
          }
  
          // Execute swap
          const slippage = (0.5 / 100) * 1e6; // 0.5% slippage
          const coinIn = txb.pure(amountIn);
  
          await executeFlowxSwap(txb, suiclient, {
            routes: queryResult.routes,
            slippage,
            coinIn,
          });
  
          // Execute the transaction
          signAndExecuteTransaction(
            {
              transaction: txb,
              chain: 'sui:mainnet',
            },
            {
              onSuccess: (result) => {
                console.log('Swap executed successfully:', result);
                setSuccessMessage('Swap completed successfully!');
                setLoading(false);
              },
              onError: (error) => {
                console.error('Swap failed:', error);
                setErrorMessage('Swap failed. Please try again.');
                setLoading(false);
              },
            },
          );
        
      
      // @abhishek code below
      // const txb = await txBuild(paths, slippage, amountinstring, amountOut, selectedTokenFrom.type, wallet);
      // console.log(txBuild, "txbuild >>")

      // const feereq = await estimateGasFee(txb);
      // console.log(feereq);
      // const { fee, amountOut: amountOutDev, pathsAmountOut } = feereq;
      // console.log(fee, "fee")

      // const tx = await txBuild(paths, slippage, amountinstring, amountOutDev, selectedTokenFrom.type, wallet, pathsAmountOut);
      // console.log(tx, "txBuild returns me this >>");
      // tx.setSender(wallet!)



      // const { bytes, signature, reportTransactionEffects } = await signTransaction({
      //   transaction: tx,
      //   chain: 'sui:mainnet',
      // });

      // const executeResult = await suiclient.executeTransactionBlock({
      //   transactionBlock: bytes,
      //   signature,
      //   options: {
      //     showRawEffects: true,
      //   },
      // });

      // Always report transaction effects to the wallet after execution
      // reportTransactionEffects(result.rawEffects!);

      // console.log(executeResult);

      // signAndExecuteTransaction(
      //   {
      //     transaction: tx,
      //     chain: 'sui:devnet',
      //   },
      // );
    } else if (currentProtocolName === 'AFTERMATH') {
      const afSdk = new Aftermath("MAINNET");
      await afSdk.init();

      const router = afSdk.Router();

      const tx = await executeAfterMathSwap({ router });
      console.log("Tx >>>>", tx);

    }
  };

  const handlesubmit = async (actionname: string) => {
    console.log(actionName, "Action name", currentActionName)
    if (currentActionName == "SWAP") {
      handleSwap();
    } else if (currentActionName == "Add_Liquidity") {

    }
  }

  const [flowXRoute, setFlowXRoute] = useState<GetRoutesResult<Coin, Coin> | null>(null);

  const fetchFlowXRoute = async ({
    updatedSellAmountValue,
    quoter
  }: {
    updatedSellAmountValue: string,
    quoter: AggregatorQuoter
  }) => {
    try {
      // TODO: @kamal we can add commission charges here
      const params = {
        tokenIn: selectedTokenFrom.type,
        tokenOut: selectedTokenTo.type,
        amountIn: updatedSellAmountValue,
        includeSources: null,
        excludeSources: null,
        commission: null, //optional, and will be explain later
      };

      const routes = await quoter.getRoutes(params);
      setFlowXRoute(routes)
      return routes
    } catch (error) {
      console.log("Error in fetching flowX Route", error);
      return null;

    }

  }

  const executeFlowXSwap = async () => {
    try {
      if (!flowXRoute) return
      const tradeBuilder = new TradeBuilder('mainnet', flowXRoute.routes);
      const trade = tradeBuilder
        .sender(wallet)
        .amountIn(flowXRoute.amountIn)
        .amountOut(flowXRoute.amountOut) // Estimate amount out, usual get from quoter
        .slippage((1 / 100) * 1e6) // Slippage 1%
        .deadline(Date.now() + 3600) // 1 hour from now
        .commission(null) // Commission will be explain later
        .build();
      console.log("trade", trade); // Output: Trade object with configured parameters

      console.log("SUI Client", suiclient);

      const txb = new TransactionBlock();

      // const txn = await trade.buildTransaction({
      //   client: suiclient
      // })

      // console.log("txn", txn);



    } catch (error) {
      console.log("Error in executing FlowXSwap", error);

    }
  }


  const [afterMathRoute, setAfterMathRoute] = useState<RouterCompleteTradeRoute | null>(null);

  const fetchAfterMathQuote = async ({
    sellAmountValue,
    router
  }: {
    sellAmountValue: string,
    router: Router
  }) => {

    try {
      const addresses = [];
      const afApi = new AftermathApi(suiclient, addresses, new IndexerCaller("MAINNET"),);

      console.log("afApi", afApi);

      const route = await router.getCompleteTradeRouteGivenAmountIn({
        coinInType: selectedTokenFrom.type,
        coinOutType: selectedTokenTo.type,
        coinInAmount: BigInt(sellAmountValue),

        referrer: "0x...",
        externalFee: {
          recipient: "0x...", // here we can add our smart contract address that can charge fess per txn
          feePercentage: 0.01,
        },
      });

      console.log("route", route);
      setAfterMathRoute(route);
      return route;
    } catch (error) {
      console.log("Error in AfterMath Quote fetching", error);
      return null
    }
  }

  const executeAfterMathSwap = async ({
    router
  }: {
    router: Router
  }) => {
    try {
      const tx = await router.getTransactionForCompleteTradeRouteV0({
        walletAddress: wallet,
        completeRoute: afterMathRoute,
        slippage: 0.01,

      });

      console.log("Transaction", tx)
      return tx;
    } catch (error) {
      console.log("Error in aftermath swap execution", error);
      return null
    }


  }

  const [strategyName, setStrategyName] = useState<string>("");
  const [strategyDescription, setStrategyDescription] = useState<string>("");
  const walrus = useWalrus();

  const handleSaveStrategy = async () => {
    if (!batchActions?.length) {
      setErrorMessage('No actions to save');
      return;
    }

    try {
      const strategy = {
        id: uuidv4(),
        name: strategyName || `Strategy ${Date.now()}`,
        description: strategyDescription,
        blocks: batchActions,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await walrus.storeStrategy(strategy);
      setSuccessMessage('Strategy saved successfully');
      
      // Reset form
      setBatchActions([]);
      setStrategyName('');
      setStrategyDescription('');
      setBlockedAction(false);
    } catch (error) {
      setErrorMessage('Failed to save strategy');
      console.error(error);
    }
  };

  return (
    <div className={styles.block} >
      <p className={styles.protocolName}>{currentProtocolName}</p>

      <div className='text-xl font-semibold tracking-tight'>
        <h3 className={styles.actionName}>{currentActionName}</h3>
      </div>

      <Button onClick={executeFlowXSwap}>Execute Flow Swap</Button>

      <div className="flex flex-col gap-8 mt-12 ">
        <Select disabled={blockedAction} onValueChange={handleActionChange} value={currentActionName}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select option" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup>
              {Object.keys(ACTIONS).map((key) => (
                <div key={key}>
                  <SelectItem value={key}>{ACTIONS[key].name}</SelectItem>
                </div>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          disabled={blockedAction}
          onValueChange={handleProtocolChange}
          value={currentProtocolName}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Protocol" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(PROTOCOLS)
                .filter(key => availableProtocols.includes(key))
                .map((key) => (
                  <div key={key}>
                    <SelectItem value={key}>{PROTOCOLS[key].name}</SelectItem>
                  </div>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col items-center justify-center h-full p-2'>
        <div className='flex items-start w-full mt-2 gap-4'>
          <div className="flex flex-row">
            <TokenChooser
              blockedAction={blockedAction}
              selectedToken={selectedTokenFrom}
              setSelectedToken={setSelectedTokenFrom}
              selectableTokens={selectableTokens}
            />
          </div>

          <div className="flex flex-row flex-1">
            <Input
              disabled={loading || blockedAction}
              className="flex-1"
              placeholder="Input amount"
              color="gray.300"
              height={"3rem"}
              // borderRadius="md"
              // borderColor="gray.300"
              // _hover={{ borderColor: "gray.500" }}
              // _focus={{ borderColor: "gray.500" }}
              onChange={handleChangeInput}
            />
          </div>


        </div>


        {currentActionName == "Add_Liquidity" || currentActionName == "Remove_Liquidity" ? <IoIosAddCircleOutline className="w-10 h-10" color={"#fff"} /> : <IoIosArrowDown className="w-10 h-10" color={"#fff"} />}

        {/* Don't display this when the action is related to FlashLoans */}
        {currentActionName !== ActionTypes.RepayFlashLoan &&
          currentActionName !== ActionTypes.TakeFlashLoan && (
            <div className={styles.actionInputField}>
              <TokenChooser
                blockedAction={blockedAction}
                selectedToken={selectedTokenTo}
                setSelectedToken={setSelectedTokenTo}
                selectableTokens={selectableTokens}
              />
              <Input
                disabled={blockedAction}
                readOnly
                className="flex-1"
                placeholder="Output amount"
                color="gray.300"
                height={"3rem"}
                // borderRadius="md"
                // borderColor="gray.300"
                // _hover={{ borderColor: "gray.500" }}
                // _focus={{ borderColor: "gray.500" }}
                value={quote ? quote : ''}
              />
            </div>
          )
        }

        <div className="flex gap-2 mt-4">
          <Button 
            onClick={() => handlesubmit(currentActionName)}
            disabled={blockedAction}
          >
            {currentActionName}
          </Button>
          <Button 
            onClick={handleLockBlock}
            variant="secondary"
            disabled={blockedAction}
          >
            Lock Block
          </Button>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
      <Button onClick={handleGetLockedBlocksData}>Execute Locked Blocks 🔥</Button>
    </div>
  );
};
export default ActionBlock;
