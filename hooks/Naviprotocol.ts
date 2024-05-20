import { OneclickSUIDefi } from "../constants/interfaces";


export class Naviprotocol implements OneclickSUIDefi {

    protected static instance: Naviprotocol;

    private constructor() {
    }

    addLiquidity(account: string,provider,token1: string, token2: string, amount1: string, amount2: string): Promise<any> {
        
    }
  
    approve(): void {
    }
  
    mint(): void {
    }
  
    removeLiquidity(): void {
    }
  
    revoke(): void {
    }
  
    public async swap(account,provider,tokenFrom: string, tokenTo: string, amountIn: string, amountOut: string): Promise<any> {
  
    }
  

}
