import { ChainId, JSBI, Percent, Token, WETH } from '@behodler/sdk'
import { fortmatic, injected, lattice, portis, torus, walletconnect, walletlink } from '../connectors'

import { AbstractConnector } from '@web3-react/abstract-connector'



// a list of tokens by chain
type ChainTokenList = {
    readonly [chainId: number]: Token[]
}

type ChainTokenMap = {
    readonly [chainId in ChainId]?: Token
}

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320


export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

// SUSHI
export const SUSHI: ChainTokenMap = {
    [ChainId.MAINNET]: new Token(
        ChainId.MAINNET,
        '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
        18,
        'SUSHI',
        'SushiToken'
    ),
    [ChainId.ROPSTEN]: new Token(
        ChainId.ROPSTEN,
        '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
        18,
        'SUSHI',
        'SushiToken'
    ),
    [ChainId.RINKEBY]: new Token(
        ChainId.RINKEBY,
        '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
        18,
        'SUSHI',
        'SushiToken'
    ),
    [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F', 18, 'SUSHI', 'SushiToken'),
    [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F', 18, 'SUSHI', 'SushiToken'),
    [ChainId.FANTOM]: new Token(ChainId.FANTOM, '0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC', 18, 'SUSHI', 'SushiToken')
}

export const SCX: ChainTokenMap = {
    [ChainId.MAINNET]: new Token(
        ChainId.MAINNET,
        '0x1B8568FbB47708E9E9D31Ff303254f748805bF21',
        18,
        'SCX',
        'Scarcity'
    )
}

export const EYE: ChainTokenMap = {
    [ChainId.MAINNET]: new Token(
        ChainId.MAINNET,
        '0x155ff1A85F440EE0A382eA949f24CE4E0b751c65',
        18,
        'EYE',
        'Behodler.io'
    )
}



// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
    [ChainId.MAINNET]: '0xcBE6B83e77cdc011Cc18F6f0Df8444E5783ed982',
    [ChainId.ROPSTEN]: '0x84d1f7202e0e7dac211617017ca72a2cb5e2b955'
}

// TODO: update weekly with new constant


// TODO: SDK should have two maps, WETH map and WNATIVE map.
const WRAPPED_NATIVE_ONLY: ChainTokenList = {
    [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
    [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
    [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
    [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
    [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
    [ChainId.FANTOM]: [WETH[ChainId.FANTOM]],
    [ChainId.FANTOM_TESTNET]: [WETH[ChainId.FANTOM_TESTNET]],
    [ChainId.MATIC]: [WETH[ChainId.MATIC]],
    [ChainId.MATIC_TESTNET]: [WETH[ChainId.MATIC_TESTNET]],
    [ChainId.XDAI]: [WETH[ChainId.XDAI]],
    [ChainId.BSC]: [WETH[ChainId.BSC]],
    [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]],
    [ChainId.ARBITRUM]: [WETH[ChainId.ARBITRUM]],
    [ChainId.AVALANCHE]: [WETH[ChainId.AVALANCHE]],
    [ChainId.HECO]: [WETH[ChainId.HECO]],
    [ChainId.HECO_TESTNET]: [WETH[ChainId.HECO_TESTNET]],
    [ChainId.HARMONY]: [WETH[ChainId.HARMONY]],
    [ChainId.HARMONY_TESTNET]: [WETH[ChainId.HARMONY_TESTNET]],
    [ChainId.OKEX]: [WETH[ChainId.OKEX]],
    [ChainId.OKEX_TESTNET]: [WETH[ChainId.OKEX_TESTNET]],
    [ChainId.GANACHE]: [],
}

// Default Ethereum chain tokens
export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')

export const BSC: { [key: string]: Token } = {
    DAI: new Token(ChainId.BSC, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin'),
    USD: new Token(ChainId.BSC, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD'),
    USDC: new Token(ChainId.BSC, '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 18, 'USDC', 'USD Coin'),
    USDT: new Token(ChainId.BSC, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD'),
    BTCB: new Token(ChainId.BSC, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Bitcoin')
}

export const FANTOM: { [key: string]: Token } = {
    USDC: new Token(ChainId.FANTOM, '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6, 'USDC', 'USD Coin'),
    WBTC: new Token(ChainId.FANTOM, '0x321162Cd933E2Be498Cd2267a90534A804051b11', 8, 'WBTC', 'Wrapped Bitcoin'),
    DAI: new Token(ChainId.FANTOM, '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 18, 'DAI', 'Dai Stablecoin'),
    WETH: new Token(ChainId.FANTOM, '0x74b23882a30290451A17c44f4F05243b6b58C76d', 18, 'WETH', 'Wrapped Ether')
}

export const MATIC: { [key: string]: Token } = {
    USDC: new Token(ChainId.MATIC, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USD Coin'),
    WBTC: new Token(ChainId.MATIC, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 8, 'WBTC', 'Wrapped Bitcoin'),
    DAI: new Token(ChainId.MATIC, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin'),
    WETH: new Token(ChainId.MATIC, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'WETH', 'Wrapped Ether'),
    USDT: new Token(ChainId.MATIC, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 6, 'USDT', 'Tether USD'),
    TEL: new Token(ChainId.MATIC, '0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32', 2, 'TEL', 'Telcoin'),
    SUSHI: new Token(ChainId.MATIC, '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a', 18, 'SUSHI', 'SushiToken'),
    AAVE: new Token(ChainId.MATIC, '0xD6DF932A45C0f255f85145f286eA0b292B21C90B', 18, 'AAVE', 'Aave')
}

// used to construct intermediary pairs for trading

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
    ...WRAPPED_NATIVE_ONLY,
    [ChainId.MAINNET]: [...WRAPPED_NATIVE_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
    [ChainId.MATIC]: [...WRAPPED_NATIVE_ONLY[ChainId.MATIC], MATIC.USDC, MATIC.WBTC, MATIC.DAI, MATIC.WETH, MATIC.USDT],
    [ChainId.FANTOM]: [...WRAPPED_NATIVE_ONLY[ChainId.FANTOM], FANTOM.DAI, FANTOM.USDC, FANTOM.WBTC, FANTOM.WETH],
    [ChainId.BSC]: [...WRAPPED_NATIVE_ONLY[ChainId.BSC], BSC.DAI, BSC.USD, BSC.USDC, BSC.USDT, BSC.BTCB]
}

export interface WalletInfo {
    connector?: AbstractConnector
    name: string
    iconName: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
}

const ACTIVE_WALLET_PROVIDERS: string[] = process.env.REACT_APP_SUPPORTED_WALLET_PROVIDERS?.split(',')
    ?? ['METAMASK', 'WALLET_CONNECT']

type SupportedWallets = { [key: string]: WalletInfo }

const ALL_SUPPORTED_WALLETS: SupportedWallets = {
    INJECTED: {
        connector: injected,
        name: 'Injected',
        iconName: 'arrow-right.svg',
        description: 'Injected web3 provider.',
        href: null,
        color: '#010101',
        primary: true
    },
    METAMASK: {
        connector: injected,
        name: 'MetaMask',
        iconName: 'metamask.png',
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D'
    },
    WALLET_CONNECT: {
        connector: walletconnect,
        name: 'WalletConnect',
        iconName: 'walletConnectIcon.svg',
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        href: null,
        color: '#4196FC',
        mobile: true
    },
    LATTICE: {
        connector: lattice,
        name: 'Lattice',
        iconName: 'gridPlusWallet.png',
        description: 'Connect to GridPlus Wallet.',
        href: null,
        color: '#40a9ff',
        mobile: true
    },
    WALLET_LINK: {
        connector: walletlink,
        name: 'Coinbase Wallet',
        iconName: 'coinbaseWalletIcon.svg',
        description: 'Use Coinbase Wallet app on mobile device',
        href: null,
        color: '#315CF5'
    },
    COINBASE_LINK: {
        name: 'Open in Coinbase Wallet',
        iconName: 'coinbaseWalletIcon.svg',
        description: 'Open in Coinbase Wallet app.',
        href: 'https://go.cb-w.com',
        color: '#315CF5',
        mobile: true,
        mobileOnly: true
    },
    FORTMATIC: {
        connector: fortmatic,
        name: 'Fortmatic',
        iconName: 'fortmaticIcon.png',
        description: 'Login using Fortmatic hosted wallet',
        href: null,
        color: '#6748FF',
        mobile: true
    },
    Portis: {
        connector: portis,
        name: 'Portis',
        iconName: 'portisIcon.png',
        description: 'Login using Portis hosted wallet',
        href: null,
        color: '#4A6C9B',
        mobile: true
    },
    Torus: {
        connector: torus,
        name: 'Torus',
        iconName: 'torusIcon.png',
        description: 'Login using Torus hosted wallet',
        href: null,
        color: '#315CF5',
        mobile: true
    }
}

export const SUPPORTED_WALLETS: SupportedWallets = Object
    .fromEntries((
        ACTIVE_WALLET_PROVIDERS
            .map(walletPrividerName => [
                walletPrividerName,
                ALL_SUPPORTED_WALLETS[walletPrividerName],
            ])
    ))

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
JSBI.BigInt(60 * 60 * 24 * 7)

JSBI.BigInt(0)

// one basis point
new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
new Percent(JSBI.BigInt(100), BIPS_BASE)  // 1%
new Percent(JSBI.BigInt(300), BIPS_BASE)  // 3%
new Percent(JSBI.BigInt(500), BIPS_BASE)  // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
new Percent(JSBI.BigInt(1000), BIPS_BASE)  // 10%
// for non expert mode disable swaps above this
new Percent(JSBI.BigInt(1500), BIPS_BASE)  // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses


// BentoBox Swappers


// Boring Helper
// export const BORING_HELPER_ADDRESS = '0x11Ca5375AdAfd6205E41131A4409f182677996E6'


