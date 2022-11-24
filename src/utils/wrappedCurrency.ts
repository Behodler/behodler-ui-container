import { ChainId, Currency, ETHER, Token, WETH } from '@sushiswap/sdk'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
    return chainId && currency === ETHER ? WETH[chainId] : currency instanceof Token ? currency : undefined
}

