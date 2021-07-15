import React, { FC } from 'react'
import { UIContainerProvider } from '@weidaiecosystem/behodler-sdk'
import { TransactionResponse, Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

import { NetworkContextName } from '../../constants'

export const Web3ContextProvider: FC = ({ children }) => {
    const walletContext = useWeb3React<Web3Provider>()
    const networkContext = useWeb3React<Web3Provider>(NetworkContextName)

    const containerContext = {
        walletContext,
        networkContext,
        walletState: {
            toggleWalletModal: () => {
                throw Error("Wallet state has not been initiated!")
            },
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
    };

    return (
        <UIContainerProvider {...containerContext}>
            {children}
        </UIContainerProvider>
    )
}
