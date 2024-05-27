
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
import { parseUnits } from 'ethers';
import { ACTIONS, PROTOCOLS, ProtocolNames } from '../constants/constants';
import TokenChooser from "./token-chooser";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { SELECTABLE_TOKENS } from "../constants/constants";
import { ChangeEvent, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion"
import { SUITOKENS } from "../constants/Suitokens";
import { Naviprotocol } from "../hooks/Naviprotocol";
import { useWallet } from "@suiet/wallet-kit";
import { ChevronDown } from "lucide-react";

const ActionBlock = ({ actionName, protocolName, onActionChange, onProtocolChange }) => {
  const x = useMotionValue(0);
  const xPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const [xPos, setXPos] = useState(x);

  const [selectedTokenFrom, setSelectedTokenFrom] = useState<any>(SELECTABLE_TOKENS[0]);
  const [selectedTokenTo, setSelectedTokenTo] = useState<any>(SELECTABLE_TOKENS[1]);

  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");

  const [sellAmount, setSellAmount] = useState<number>();
  const [quote, setQuote] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const wallet = useWallet();

  const [currentActionName, setCurrentActionName] = useState(actionName || ACTIONS['ADD_LIQUIDITY'].type);
  const [currentProtocolName, setProtocolName] = useState(protocolName || PROTOCOLS['KRIYA'].name);


  const [lockedBlocks, setLockedBlocks] = useState([]);

  const handleLockAction = () => {
    const newLockedBlock = {
      actionName: currentActionName,
      protocolName: currentProtocolName,
      selectedTokenFrom,
      selectedTokenTo,
      sellAmount,
      quote
    };
    setLockedBlocks([...lockedBlocks, newLockedBlock]);
    // Clear current state values
    setCurrentActionName(currentActionName);
    setProtocolName(currentProtocolName);
    setSelectedTokenFrom(SELECTABLE_TOKENS[0]);
    setSelectedTokenTo(SELECTABLE_TOKENS[1]);
    setSellAmount(sellAmount);
    setQuote(quote);

    setLockedBlocks(prevBlocks => [...prevBlocks, newLockedBlock]);
  };

  const handleGetLockedBlocksData = () => {
    // Use lockedBlocks array to access all the locked blocks' data
    console.log("Locked Blocks Data:", lockedBlocks);
  };

  const handleActionChange = (value) => {

    console.log("value>>", value);

    // const selectedActionKey = event.target.value;
    setCurrentActionName(value);
    // onActionChange(selectedActionKey);
  };

  const handleProtocolChange = (value) => {
    console.log("value>>", value);
    setProtocolName(value);
  };

  // Determine which token list to use based on the protocolName
  const selectableTokens = SUITOKENS;

  useEffect(() => {
    // Reset selected tokens when protocol changes
    setSelectedTokenFrom(selectableTokens[0]);
    setSelectedTokenTo(selectableTokens[1]);
  }, [protocolName, selectableTokens]);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!wallet) return;
    setErrorMessage('');
    const sellAmountValue = Number(event.target.value);
    console.log("Sell Amount valueeee>>>>>", sellAmountValue, event.target.value);
    setSellAmount(sellAmountValue);
    if (currentProtocolName === "NAVIPROTOCOL") {

      if (selectedTokenFrom.decimals) {
        const sellamountbaseunit = sellAmountValue * Math.pow(10, selectedTokenFrom.decimals);

        fetch('/api/quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify({
            offer_address: selectedTokenFrom.address,
            ask_address: selectedTokenTo.address,
            units: sellamountbaseunit,
            slippage_tolerance: 0.001
          })
        })
          .then(response => response.json())
          .then(data => {
            const quote = data.ask_units / Math.pow(10, selectedTokenTo.decimals);
            setQuote(quote.toString());
            console.log("quote set", data.ask_units);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {

        console.log(sellAmountValue, selectedTokenFrom.decimals, "sellAmountValue");
        fetch('/api/quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify({
            offer_address: selectedTokenFrom.address,
            ask_address: selectedTokenTo.address,
            units: sellAmountValue,
            slippage_tolerance: 0.001
          })
        })
          .then(response => response.json())
          .then(data => {
            const quote = data.ask_units / Math.pow(10, selectedTokenTo.decimals);
            setQuote(quote.toString());
            console.log("quote set", data.ask_units);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    } else if (currentProtocolName === "KRIYA") {
      const sellAmountValue = Number(event.target.value);
      // get the quote
    }
    setLoading(true);
  };


  const handleSwap = async () => {
    if (!wallet || !sellAmount || !quote) return;
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    if (protocolName === "NAVIPROTOCOL") {
      const Navi = Naviprotocol.getInstance();

      try {

      } catch (error) {
        console.error('Error during swap:', error);
      }
    } else if (protocolName === "KRIYA") {
      try {


      } catch (error) {
        console.error('Error during swap:', error);
      }
    }
  };

  useEffect(() => {

  }, [x]);






  const handlesubmit = async (actionname: string) => {
    if (actionname == "Swap") {
      handleSwap();
    } else if (actionname == "Add Liquidity") {

    }
  }


  console.log("selectableTokens", selectableTokens);

  return (
    <div className={styles.block} >
      <p className={styles.protocolName}>{currentProtocolName}</p>

      <div className='text-xl font-semibold tracking-tight'>
        <h3 className={styles.actionName}>{currentActionName}</h3>
      </div>

      <div className="flex flex-col gap-8 mt-12">
        <Select onValueChange={handleActionChange} value={currentActionName}>
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
              )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={handleProtocolChange} value={currentProtocolName}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Protocol" />
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(PROTOCOLS).map((key) => (
                <div key={key}>
                  <SelectItem value={key}> {PROTOCOLS[key].name}</SelectItem>
                </div>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>


      <div className={styles.actionInputsWrapper}>
        <div className={styles.actionInputField}>
          <TokenChooser
            selectedToken={selectedTokenFrom}
            setSelectedToken={setSelectedTokenFrom}
            selectableTokens={selectableTokens}
          />
          <Input
            className="flex-1"
            placeholder="Input amount"
            color="gray.300"
            height={"3rem"}
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "gray.500" }}
            onChange={handleChangeInput} disabled={loading}
          />
        </div>
        {currentActionName == "Add Liquidity" || currentActionName == "Remove Liquidity" ? <IoIosAddCircleOutline w={10} h={10} color={"#fff"} /> : <CiCircleMinus w={10} h={10} color={"#fff"} />}
        <div className={styles.actionInputField}>
          <TokenChooser
            selectedToken={selectedTokenTo}
            setSelectedToken={setSelectedTokenTo}
            selectableTokens={selectableTokens}
          />
          <Input
            readOnly
            className="flex-1"
            placeholder="Output amount"
            color="gray.300"
            height={"3rem"}
            borderRadius="md"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "gray.500" }}
            value={quote ? quote : ''}
          />
        </div>
        <div>
          {loading ? <p style={{ color: 'green' }}>Loading...</p> : <Button style={{ color: 'green' }} onClick={() => handlesubmit(currentActionName)}>{currentActionName}</Button>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>Success</p>}
        </div>

        <Button onClick={handleLockAction}>Lock This Action 🔒</Button>
        <Button onClick={handleGetLockedBlocksData}>Execute Locked Blocks 🔥</Button>
      </div>
    </div>
  );
};
export default ActionBlock;
