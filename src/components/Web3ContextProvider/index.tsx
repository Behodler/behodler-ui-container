import React, { FC } from 'react'
import { UIContainerProvider } from '@weidaiecosystem/behodler-sdk'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

import { NetworkContextName } from '../../constants'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useAllTransactions, useTransactionAdder } from '../../state/transactions/hooks'

export const Web3ContextProvider: FC = ({ children }) => {
    const walletContext = useWeb3React<Web3Provider>()
    const networkContext = useWeb3React<Web3Provider>(NetworkContextName)

    const containerContext = {
        walletContext,
        networkContext,
        walletState: {
            toggleWalletModal: useWalletModalToggle(),
            transactions: useAllTransactions(),
            addTransaction: useTransactionAdder(),
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
