export enum ActionTypes {
  SWAP = 'SWAP',
  ADD_LIQUIDITY = 'ADD_LIQUIDITY',
  REMOVE_LIQUIDITY = 'REMOVE_LIQUIDITY',
  TRANSFER = 'TRANSFER',
  WITHDRAW = 'WITHDRAW',
  TakeFlashLoan = 'TakeFlashLoan',
  RepayFlashLoan = 'RepayFlashLoan',
}

export const ProtocolNames = {
  NAVI: 'NAVI',
  KRIYA: 'KRIYA',
  SUPRA: 'SUPRA',
  AFTERMATH: 'AFTERMATH',
  BUCKET: 'BUCKET',
  CETUS: 'CETUS',
  SCALLOP: 'SCALLOP',
};

export const PROTOCOLS: { [key in keyof typeof ProtocolNames]?: any } = {
  [ProtocolNames.NAVI]: {
    name: 'NAVI',
    packageid: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  },
  [ProtocolNames.KRIYA]: {
    name: 'KRIYA',
    packageid: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  },
  [ProtocolNames.SUPRA]: {
    name: 'SUPRA',
    packageid: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  },
  [ProtocolNames.AFTERMATH]: {
    name: 'AFTERMATH',
    packageid: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  },
  [ProtocolNames.BUCKET]: {
    name: 'BUCKET',
    packageid: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  },
  [ProtocolNames.CETUS]: {
    name: 'CETUS',
    packageid: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  },
  [ProtocolNames.SCALLOP]: {
    name: 'SCALLOP',
    packageid: '0x818e6fecd516ecc3849daf6845e3ec868087b755',
  },
}


export const ACTIONS: { [key in keyof typeof ActionTypes]?: any } = {
  [ActionTypes.SWAP]: {
    type: ActionTypes.SWAP,
    name: 'Swap',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.KRIYA
    ],
  },
  [ActionTypes.ADD_LIQUIDITY]: {
    type: ActionTypes.ADD_LIQUIDITY,
    name: 'Add Liquidity',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.KRIYA
    ],
  },
  [ActionTypes.REMOVE_LIQUIDITY]: {
    type: ActionTypes.REMOVE_LIQUIDITY,
    name: 'Remove Liquidity',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.KRIYA
    ],
  },
  [ActionTypes.TakeFlashLoan]: {
    type: ActionTypes.TakeFlashLoan,
    name: 'Take Flashloan',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.BUCKET
    ],
  },
  [ActionTypes.RepayFlashLoan]: {
    type: ActionTypes.RepayFlashLoan,
    name: 'Repay Flashloan',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.BUCKET
    ],
  },
  [ActionTypes.TRANSFER]: {
    type: ActionTypes.TRANSFER,
    name: 'Transfer',
    availableProtocols: [
    ],
  },
};

export const SELECTABLE_TOKENS = [
  {
    address: "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
    chainId: 1,
    decimals: 9,
    extensions: { coingeckoId: 'sui' },
    logoURI: "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/SUI.png",
    name: "Sui Coin",
    symbol: "SUI",
    tags: ['native']
  },
  {
    address: "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
    chainId: 1,
    decimals: 9,
    extensions: { coingeckoId: 'sui' },
    logoURI: "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/SUI.png",
    name: "Sui Coin",
    symbol: "SUI",
    tags: ['native']
  },
  {
    name: 'BTC',
    address: '',
    decimals: 18,
    symbol: 'BTC',
  },
  {
    name: 'USDT',
    address: '',
    decimals: 18,
    symbol: 'USDT',
  },
  {
    name: 'USDC',
    address: '',
    decimals: 6,
    symbol: 'USDC',
  },
  {
    name: 'ETH',
    address: '',
    decimals: 18,
    symbol: 'ETH',
  },
];

export const AVNU_TOKENS = [
  {
    name: 'ETH',
    address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    decimals: 18,
    symbol: 'ETH',
  },
  {
    name: 'USDC',
    address: '0x005a643907b9a4bc6a55e9069c4fd5fd1f5c79a22470690f75556c4736e34426',
    decimals: 6,
    symbol: 'USDC',
  },
  {
    name: 'DAI',
    address: '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9',
    decimals: 18,
    symbol: 'DAI',
  },
  {
    name: 'Wrapped BTC',
    address: '0x12d537dc323c439dc65c976fad242d5610d27cfb5f31689a0a319b8be7f3d56',
    decimals: 8,
    symbol: 'wBTC',
  }
];
