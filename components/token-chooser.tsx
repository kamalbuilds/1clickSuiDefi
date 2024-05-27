import { Button } from "./ui/button";
import { Menu  } from "lucide-react";
//@ts-ignore
import { Btc, Usdt } from 'react-cryptocoins';
import { inspect } from "util";
import styles from './token-chooser.module.css';
import dynamic from "next/dynamic";

const TokenChooser = (props: any) => {
  const DynamicIconComponent: any = dynamic(() => import(`react-cryptocoins/dist/icons/${props.selectedToken.symbol}`))

  console.log("Props", props);

  return (
    <Menu>
      <Button>
        <div className={styles.buttonWrapper}>

          <DynamicIconComponent size={18} fill="#1A202C" />
          <span className={styles.buttonText}>{props.selectedToken.symbol}</span>
        </div>
      </Button>
      <div>

        {
          props.selectableTokens.map((token: any) => {
            if (token.symbol === props.selectedToken.symbol) return null;
            const DynamicIconOptionComponent: any = dynamic(() => import(`react-cryptocoins/dist/icons/${token.symbol}`))
            return (
              <div key={token.symbol} onClick={() => props.setSelectedToken(token)}>
                <div className={styles.optionWrapper}>
                  <DynamicIconOptionComponent size={18} fill="#1A202C" />
                  <span className={styles.buttonText}>{token.symbol}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </Menu>
  );
}
export default TokenChooser;
