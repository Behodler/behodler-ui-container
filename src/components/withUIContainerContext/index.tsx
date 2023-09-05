import { useWeb3React } from '@web3-react/core'
import { NetworkContextName } from '../../constants'
import React from 'react'
import { UIContainerContextProps } from 'contexts/UIContainerContext'
import { useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import { useWalletModalToggle } from 'state/application/hooks'

/**
 * This HOC injects UIContainerContext as props to the underlying component
 * @param Component Most likely dapp(s)
 */
const withUIContainerContext = <P extends object>(
    Component: React.ComponentType<P & UIContainerContextProps>
): React.FC<P & UIContainerContextProps> => (props: P) => {
    const walletContext = useWeb3React()
    const networkContext = useWeb3React(NetworkContextName)

    // wallet state
    const toggleWalletModal = useWalletModalToggle()
    const transactions = useAllTransactions()
    const addTransaction = useTransactionAdder()

    // user state
    const userDarkMode = true

    return (
        <Component
            {...props}
            walletContext={walletContext}
            networkContext={networkContext}
            walletState={{ toggleWalletModal, transactions, addTransaction }}
            userState={{ userDarkMode }}
        />
    )
}

export default withUIContainerContext
