import { AbstractConnector } from '@web3-react/abstract-connector'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { TransactionResponse } from '@ethersproject/providers'
import React, { useContext } from 'react'
import { TransactionDetails } from 'state/transactions/reducer'

export interface UIContainerContextProps {
    walletContext: Web3ReactContextInterface
    networkContext: Web3ReactContextInterface
    walletState: {
        transactions: { [txHash: string]: TransactionDetails },
        addTransaction: (
            response: TransactionResponse,
            customData?: {
                summary?: string
                approval?: { tokenAddress: string; spender: string }
                claim?: { recipient: string }
            }
        ) => void
    },
    userState: {
        userDarkMode: boolean
    }
}

const getDefaultWeb3Context = (): Web3ReactContextInterface => ({
    active: false,
    activate: (_connector: AbstractConnector, _onError?: (error: Error) => void, _throwErrors?: boolean) =>
        Promise.reject(),
    setError: (_error: Error) => {
        throw Error('Web3 Context has not been initiated!')
    },
    deactivate: () => {
        throw Error('Web3 Context has not been initiated!')
    }
})

export const UIContainerContext = React.createContext<UIContainerContextProps>({
    walletContext: getDefaultWeb3Context(),
    networkContext: getDefaultWeb3Context(),
    walletState: {
        transactions: {},
        addTransaction: (
            _response: TransactionResponse,
            _customData?: {
                summary?: string
                approval?: { tokenAddress: string; spender: string }
                claim?: { recipient: string }
            }
        ) => {
            throw Error("Wallet state has not been initiated!")
        }
    },
    userState: {
        userDarkMode: false
    }
})

export const useWeb3WalletContext = () => useContext(UIContainerContext).walletContext
export const useWeb3NetworkContext = () => useContext(UIContainerContext).networkContext