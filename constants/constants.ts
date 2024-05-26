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
  KRIYADEX: 'KRIYADEX',
  SUPRA: 'SUPRA',
  AFTERMATH: 'AFTERMATH',
  BUCKET: 'BUCKET',
  CETUS: 'CETUS',
  SCALLOP: 'SCALLOP',
  FLOWX: 'FLOWX',
  TYPUS: 'TYPUS'
};


export interface Pool {
  objectId: string;
  tokenXType: string;
  tokenYType: string;
  isStable?: boolean;
}

const pools: { [key: string]: Pool } = {
  "WUSDC-SUI": {
    objectId: "0x5af4976b871fa1813362f352fa4cada3883a96191bb7212db1bd5d13685ae305",
    tokenXType: "wUSDC",
    tokenYType: "SUI"
  },
  "WUSDCe-WUSDTe": {
    objectId: "0xd0086b7713e0487bbf5bb4a1e30a000794e570590a6041155cdbebee3cb1cb77",
    tokenXType: "wUSDCe",
    tokenYType: "wUSDTe", 
    isStable: true
  },
  "WETH-WUSDCe": {
    objectId: "0x43ca1a6de20d7feabcaa460ac3798a6fdc754d3a83b49dff93221612c1370dcc",
    tokenXType: "WETH",
    tokenYType: "wUSDCe"
  },
  "USDCbnb-SUI": {
    objectId: "0x517ee525c34fdfb2240342bd43fc07e1ec253c2442a7edd2482e6973700c6ef5",
    tokenXType: "USDCbnb",
    tokenYType: "SUI"
  },
  "CUSDCe-CUSDTe": {
    objectId: "0x1a32f76a27f49ba590ffebfd906bd4d6733e67090c5aec9bdd50d2c34e5db763",
    tokenXType: "cUSDCe",
    tokenYType: "cUSDTe"
  },
  "CUSDCe-SUI": {
    objectId: "0x074c421ceea5db8c393d4b5520d612782ccf10b51856d844d998a3fbc4896170",
    tokenXType: "cUSDCe",
    tokenYType: "SUI"
  },
  "BUCK-SUI": {
    objectId: "0x3c334f9d1b969767007d26bc886786f9f197ffb14771f7903cd8772c46d08dea",
    tokenXType: "BUCK",
    tokenYType: "SUI"
  },
  "USDC-BUCK": {
    objectId: "0xbb4a712b3353176092cdfe3dd2d1251b725f9372e954248e5dd2eb2ab6a5f21a",
    tokenXType: "USDC",
    tokenYType: "BUCK"
  },
  "VSUI-SUI": {
    objectId: "0xf385dee283495bb70500f5f8491047cd5a2ef1b7ff5f410e6dfe8a3c3ba58716",
    tokenXType: "vSUI",
    tokenYType: "SUI"
  },
  "AFSUI-SUI": {
    objectId: "0xc0d598bcad669ac1a9b0af255de259c46092b495cdd6c26f2cb38bb23d8b4357",
    tokenXType: "afSUI",
    tokenYType: "SUI"
  }
};

export declare function getFullnodeUrl(network: 'mainnet' | 'testnet' | 'devnet' | 'localnet'): "https://fullnode.mainnet.sui.io:443" | "https://fullnode.testnet.sui.io:443" | "https://fullnode.devnet.sui.io:443" | "http://127.0.0.1:9000";

export const getPoolByName = (poolName: string): Pool | undefined => {
  return pools[poolName];
};


export const PROTOCOLS: { [key in keyof typeof ProtocolNames]?: any } = {
  [ProtocolNames.NAVI]: {
    name: 'NAVI',
    packageid: '',
  },
  [ProtocolNames.KRIYADEX]: {
    name: 'KRIYADEX',
    packageid: '',
  },
  [ProtocolNames.SUPRA]: {
    name: 'SUPRA',
    packageid: '',
  },
  [ProtocolNames.AFTERMATH]: {
    name: 'AFTERMATH',
    packageid: '',
  },
  [ProtocolNames.BUCKET]: {
    name: 'BUCKET',
    packageid: '',
  },
  [ProtocolNames.CETUS]: {
    name: 'CETUS',
    packageid: '',
  },
  [ProtocolNames.SCALLOP]: {
    name: 'SCALLOP',
    packageid: '',
  },
  [ProtocolNames.FLOWX]: {
    name: 'FLOWX',
    packageid: ''
  },
  [ProtocolNames.TYPUS]: {
    name: 'TYPUS',
    packageid: ''
  }
}


export const ACTIONS: { [key in keyof typeof ActionTypes]?: any } = {
  [ActionTypes.SWAP]: {
    type: ActionTypes.SWAP,
    name: 'Swap',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.KRIYADEX
    ],
  },
  [ActionTypes.ADD_LIQUIDITY]: {
    type: ActionTypes.ADD_LIQUIDITY,
    name: 'Add Liquidity',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.KRIYADEX
    ],
  },
  [ActionTypes.REMOVE_LIQUIDITY]: {
    type: ActionTypes.REMOVE_LIQUIDITY,
    name: 'Remove Liquidity',
    availableProtocols: [
      ProtocolNames.NAVI,
      ProtocolNames.KRIYADEX
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

export const SELECTABLE_TOKENS  =  [
  {
    "type": "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
    "decimals": 9,
    "name": "Sui Coin",
    "symbol": "SUI",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/SUI.png",
    "tags": [
      "native"
    ],
    "extensions": {
      "coingeckoId": "sui"
    }
  },
  {
    "type": "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
    "decimals": 6,
    "name": "USD Coin (Wormhole from Ethereum)",
    "symbol": "USDC",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/USDC.png",
    "extensions": {
      "coingeckoId": "usd-coin-wormhole-from-ethereum"
    }
  },
  {
    "type": "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
    "decimals": 6,
    "name": "Tether USD (Wormhole from Ethereum)",
    "symbol": "USDT",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/USDT.png",
    "extensions": {
      "coingeckoId": "tether-usd-wormhole-from-ethereum"
    }
  },
  {
    "type": "0xb231fcda8bbddb31f2ef02e6161444aec64a514e2c89279584ac9806ce9cf037::coin::COIN",
    "decimals": 6,
    "name": "USD Coin (Wormhole from Solana)",
    "symbol": "USDCso",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/USDC.png"
  },
  {
    "type": "0x909cba62ce96d54de25bec9502de5ca7b4f28901747bbf96b76c2e63ec5f1cba::coin::COIN",
    "decimals": 8,
    "name": "USD Coin (BNB)",
    "symbol": "USDCbnb",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/USDC.png",
    "extensions": {
      "coingeckoId": "usd-coin-wormhole-bnb"
    }
  },
  {
    "type": "0xe32d3ebafa42e6011b87ef1087bbc6053b499bf6f095807b9013aff5a6ecd7bb::coin::COIN",
    "decimals": 6,
    "name": "USD Coin (ARB)",
    "symbol": "USDCarb",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/USDC.png",
    "extensions": {
      "coingeckoId": "usd-coin-wormhole-arb"
    }
  },
  {
    "type": "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
    "decimals": 8,
    "name": "Wrapped Ether (Wormhole from Ethereum)",
    "symbol": "WETH",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/common/WETH.png",
    "extensions": {
      "coingeckoId": "ethereum-wormhole"
    }
  },
  {
    "type": "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
    "decimals": 9,
    "name": "Cetus Protocol",
    "symbol": "CETUS",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b_cetus_CETUS.png",
    "extensions": {
      "coingeckoId": "cetus-protocol"
    }
  },
  {
    "type": "0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
    "decimals": 9,
    "name": "Cetus Protocol",
    "symbol": "CETUS",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b_cetus_CETUS.png",
    "extensions": {
      "coingeckoId": "cetus-protocol"
    }
  },
  {
    "type": "0xd9f9b0b4f35276eecd1eea6985bfabe2a2bbd5575f9adb9162ccbdb4ddebde7f::smove::SMOVE",
    "decimals": 9,
    "name": "BlueMove",
    "symbol": "MOVE",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/0xd9f9b0b4f35276eecd1eea6985bfabe2a2bbd5575f9adb9162ccbdb4ddebde7f_smove_SMOVE.png",
    "extensions": {
      "coingeckoId": "bluemove"
    }
  },
  {
    "type": "0x1d58e26e85fbf9ee8596872686da75544342487f95b1773be3c9a49ab1061b19::suia_token::SUIA_TOKEN",
    "decimals": 9,
    "name": "SUIA",
    "symbol": "SUIA",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/0x1d58e26e85fbf9ee8596872686da75544342487f95b1773be3c9a49ab1061b19_suia_token_SUIA_TOKEN.png",
    "extensions": {
      "coingeckoId": "suia"
    }
  },
  {
    "type": "0x361dd589b98e8fcda9a7ee53b85efabef3569d00416640d2faa516e3801d7ffc::TOKEN::TOKEN",
    "decimals": 9,
    "name": "Suiswap",
    "symbol": "SSWP",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/0x361dd589b98e8fcda9a7ee53b85efabef3569d00416640d2faa516e3801d7ffc_TOKEN_TOKEN.png",
    "extensions": {
      "coingeckoId": "suiswap"
    }
  },
  {
    "type": "0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS",
    "decimals": 9,
    "name": "Turbos Finance",
    "symbol": "TURBOS",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/0x1d58e26e85fbf9ee8596872686da75544342487f95b1773be3c9a49ab1061b19_suia_token_SUIA_TOKEN.png",
    "extensions": {
      "coingeckoId": "turbos-finance"
    }
  },
  {
    "type": "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK",
    "decimals": 9,
    "name": "Bucket USD",
    "symbol": "BUCK",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/bucket-usd.png"
  },
  {
    "type": "0x9a5502414b5d51d01c8b5641db7436d789fa15a245694b24aa37c25c2a6ce001::scb::SCB",
    "decimals": 5,
    "name": "Sacabam",
    "symbol": "SCB",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/sacabam.png"
  },
  {
    "type": "0xe4239cd951f6c53d9c41e25270d80d31f925ad1655e5ba5b543843d4a66975ee::SUIP::SUIP",
    "decimals": 9,
    "name": "SuiPad",
    "symbol": "SUIP",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/suip.png",
    "extensions": {
      "coingeckoId": "suipad"
    }
  },
  {
    "type": "0xde2d3e02ba60b806f81ee9220be2a34932a513fe8d7f553167649e95de21c066::reap_token::REAP_TOKEN",
    "decimals": 9,
    "name": "Releap",
    "symbol": "REAP",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/reap.png",
    "extensions": {
      "coingeckoId": "releap"
    }
  },
  {
    "type": "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
    "decimals": 9,
    "name": "Volo Staked SUI",
    "symbol": "vSUI",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/vsui.png",
    "extensions": {
      "coingeckoId": "volo-staked-sui"
    }
  },
  {
    "type": "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
    "decimals": 9,
    "name": "afSUI",
    "symbol": "afSUI",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/afsui.png",
    "extensions": {
      "coingeckoId": "aftermath-staked-sui"
    }
  },
  {
    "type": "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
    "decimals": 9,
    "name": "haSUI",
    "symbol": "haSUI",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/hasui.png"
  },
  {
    "type": "0xbff8dc60d3f714f678cd4490ff08cabbea95d308c6de47a150c79cc875e0c7c6::sbox::SBOX",
    "decimals": 1,
    "name": "SBOX",
    "symbol": "SBOX",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/sbox.png"
  },
  {
    "type": "0x6db9a7bb22829898fd281879778a175120ebfc77eafc1f8ee341654cfc3f8dc2::burry::BURRY",
    "decimals": 9,
    "name": "Burrial",
    "symbol": "BURRY",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/burry.png"
  },
  {
    "type": "0x774621b70e7de5c094b15741583ede6ec110538891bd756bcc8a13c94eeaa3a6::ius::IUS",
    "decimals": 9,
    "name": "IUS",
    "symbol": "IUS",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/ius.png"
  },
  {
    "type": "0x8d7828432b668f731d3ceb17f7fb9cad7225bf01b6af16e61b71b02384f9f291::babyscb::BABYSCB",
    "decimals": 3,
    "name": "Baby Sacabam",
    "symbol": "BABYSCB",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/babyscb.png"
  },
  {
    "type": "0x31172eee47a69a0a5e6e198f385286c1f3b71cd73264e89234db7f318ec85a75::dsui::DSUI",
    "decimals": 8,
    "name": "Dragon on Sui",
    "symbol": "DSUI",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/dsui.png"
  },
  {
    "type": "0x6dae8ca14311574fdfe555524ea48558e3d1360d1607d1c7f98af867e3b7976c::flx::FLX",
    "decimals": 8,
    "name": "FlowX",
    "symbol": "FLX",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/flx.png",
    "extensions": {
      "coingeckoId": "flowx-finance"
    }
  },
  {
    "type": "0x65ed6d4e666fcbc1afcd9d4b1d6d4af7def3eeeeaa663f5bebae8101112290f6::xflx::XFLX",
    "decimals": 8,
    "name": "XFlowX",
    "symbol": "XFLX",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/xflx.png"
  },
  {
    "type": "0xebbf537bc3686be32fe22b498b42715641bbb209267be72236a352e0444cc5df::sui_pepe::SUI_PEPE",
    "decimals": 6,
    "name": "SUI PEPE",
    "symbol": "SUIPEPE",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/suipepe.png"
  },
  {
    "type": "0x485209b209f8f25dc734b39dc2f8fbaa952d960eff12f369d84f52a97ded6241::src::SRC",
    "decimals": 6,
    "name": "Sui Rabbit Coin",
    "symbol": "SRC",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/src.png"
  },
  {
    "type": "0x84d155fb70aebcc1391bf497d8fc139154be745765dfec57faef4704f4112c79::vaporeon::VAPOREON",
    "decimals": 8,
    "name": "Vaporeon",
    "symbol": "VAPOREON",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/vaporeon.png"
  },
  {
    "type": "0xf650095a56628d769473cfb1df16941e8985ac339ba66832f84e2899854e4121::hold::HOLD",
    "decimals": 8,
    "name": "Hold it on Sui",
    "symbol": "HOLD",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/hold.png"
  },
  {
    "type": "0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX",
    "decimals": 9,
    "name": "NAVX Token",
    "symbol": "NAVX",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/navx.png",
    "extensions": {
      "coingeckoId": "navi"
    }
  },
  {
    "type": "0xb779486cfd6c19e9218cc7dc17c453014d2d9ba12d2ee4dbb0ec4e1e02ae1cca::spt::SPT",
    "decimals": 9,
    "name": "SPT",
    "symbol": "SPT",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/spt.png",
    "extensions": {
      "coingeckoId": "seapad"
    }
  },
  {
    "type": "0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD",
    "decimals": 5,
    "name": "FUD",
    "symbol": "FUD",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/fud.png",
    "extensions": {
      "coingeckoId": "fud-the-pug"
    }
  },
  {
    "type": "0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA",
    "decimals": 9,
    "name": "Scallop",
    "symbol": "SCA",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/sca.png",
    "extensions": {
      "coingeckoId": "scallop-2"
    }
  },
  {
    "type": "0x8c47c0bde84b7056520a44f46c56383e714cc9b6a55e919d8736a34ec7ccb533::suicune::SUICUNE",
    "decimals": 9,
    "name": "Suicune",
    "symbol": "HSUI",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/suicune.png"
  },
  {
    "type": "0xceab84acf6bf70f503c3b0627acaff6b3f84cee0f2d7ed53d00fa6c2a168d14f::alp::ALP",
    "decimals": 6,
    "name": "ABEx LP Token",
    "symbol": "ALP",
    "logoURI": "https://raw.githubusercontent.com/sonarwatch/token-lists/main/images/sui/alp.webp"
  }
]