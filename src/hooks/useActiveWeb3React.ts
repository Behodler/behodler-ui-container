import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@sushiswap/sdk'
import { useWeb3NetworkContext, useWeb3WalletContext } from 'contexts/UIContainerContext'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } {
    const context = useWeb3WalletContext()
    const contextNetwork = useWeb3NetworkContext()

    return context.active ? context : contextNetwork
}

export default useActiveWeb3React
