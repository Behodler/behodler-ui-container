import { ChainId } from '@sushiswap/sdk'
import { FortmaticConnector } from './Fortmatic'
import { InjectedConnector } from '@web3-react/injected-connector'
import { LatticeConnector } from '@web3-react/lattice-connector'
import { NetworkConnector } from './NetworkConnector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TorusConnector } from '@web3-react/torus-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { Web3Provider } from '@ethersproject/providers'

const RPC = {
    [ChainId.MAINNET]: process.env.REACT_APP_ETH_MAINNET_RPC ?? '',
    [ChainId.ROPSTEN]: process.env.REACT_APP_ETH_ROPSTEN_RPC ?? '',
    [ChainId.RINKEBY]: process.env.REACT_APP_ETH_RINKEBY_RPC ?? '',
    [ChainId.GÖRLI]: process.env.REACT_APP_ETH_GOERLI_RPC ?? '',
    [ChainId.KOVAN]: process.env.REACT_APP_ETH_KOVAN_RPC ?? '',
    [ChainId.FANTOM]: process.env.REACT_APP_FANTOM_RPC ?? '',
    [ChainId.FANTOM_TESTNET]: process.env.REACT_APP_FANTOM_TESTNET_RPC ?? '',
    [ChainId.MATIC]: process.env.REACT_APP_MATIC_RPC ?? '',
    [ChainId.MATIC_TESTNET]: process.env.REACT_APP_MATIC_TESTNET_RPC ?? '',
    [ChainId.XDAI]: process.env.REACT_APP_XDAI_RPC ?? '',
    [ChainId.BSC]: process.env.REACT_APP_BSC_RPC ?? '',
    [ChainId.BSC_TESTNET]: process.env.REACT_APP_BSC_TESTNET_RPC ?? '',
    [ChainId.MOONBASE]: process.env.REACT_APP_MOONBASE_RPC ?? '',
    [ChainId.AVALANCHE]: process.env.REACT_APP_AVALANCHE_RPC ?? '',
    [ChainId.FUJI]: process.env.REACT_APP_FUJI_RPC ?? '',
    [ChainId.HECO]: process.env.REACT_APP_HECO_RPC ?? '',
    [ChainId.HECO_TESTNET]: process.env.REACT_APP_HECO_TESTNET_RPC ?? '',
    [ChainId.HARMONY]: process.env.REACT_APP_HARMONY_RPC ?? '',
    [ChainId.HARMONY_TESTNET]: process.env.REACT_APP_HARMONY_TESTNET_RPC ?? '',
    [ChainId.OKEX]: process.env.REACT_APP_OKEX_RPC ?? '',
    [ChainId.OKEX_TESTNET]: process.env.REACT_APP_OKEX_TESTNET_RPC ?? '',
}

console.info('RPC', {
    RPC,
    filtered: Object.fromEntries(Object.entries(RPC).filter(([key, value]) => !!value)),
});

export const network = new NetworkConnector({
    defaultChainId: 1,
    urls: Object.fromEntries(Object.entries(RPC).filter(([key, value]) => !!value)),
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
    return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
    supportedChainIds: [
        1, // mainnet
        3, // ropsten
        4, // rinkeby
        5, // goreli
        42, // kovan
        250, // fantom
        4002, // fantom testnet
        137, // matic
        80001, // matic testnet
        100, // xdai
        56, // binance smart chain
        97, // binance smart chain testnet
        1287, // moonbase
        43114, // avalanche
        43113, // fuji
        128, // heco
        256, // heco testnet
        1666600000, // harmony
        1666700000, // harmony testnet
        66, // okex testnet
        65 // okex testnet
    ]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
    rpc: {
        [ChainId.MAINNET]: RPC[ChainId.MAINNET]
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000
})

// mainnet only
export const lattice = new LatticeConnector({
    chainId: 1,
    url: RPC[ChainId.MAINNET],
    appName: 'BehodlerAMM'
})

// mainnet only
export const fortmatic = new FortmaticConnector({
    apiKey: process.env.REACT_APP_FORTMATIC_API_KEY ?? '',
    chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
    dAppId: process.env.REACT_APP_PORTIS_ID ?? '',
    networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
    url: RPC[ChainId.MAINNET],
    appName: 'BehodlerAMM',
    appLogoUrl: 'https://raw.githubusercontent.com/Behodler/behodler-ui-container/1739e3e2b57e88ccc0354e9f626ec32e37187aa2/public/images/logo-192x192.png?token=ABIXNG2RZ5TYT2UPDBLQSM3BLL5J4'
})

// mainnet only
export const torus = new TorusConnector({
    chainId: 1
})

// export const bsc = new BscConnector({ supportedChainIds: [56] })
