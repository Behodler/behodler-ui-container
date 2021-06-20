import { AbstractConnector } from '@web3-react/abstract-connector'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import React, { useContext } from 'react'

export interface UIContainerContextProps {
    walletContext: Web3ReactContextInterface
    networkContext: Web3ReactContextInterface
}

const getDefaultWeb3Context = (): Web3ReactContextInterface => ({
    active: false,
    activate: (_connector: AbstractConnector, _onError?: (error: Error) => void, _throwErrors?: boolean) =>
        Promise.reject(),
    setError: (_error: Error) => {
        throw Error('Web3 Context has not yet initiated!')
    },
    deactivate: () => {
        throw Error('Web3 Context has not yet initiated!')
    }
})

export const UIContainerContext = React.createContext<UIContainerContextProps>({
    walletContext: getDefaultWeb3Context(),
    networkContext: getDefaultWeb3Context()
})

export const useWeb3WalletContext = () => useContext(UIContainerContext).walletContext
export const useWeb3NetworkContext = () => useContext(UIContainerContext).networkContext