import { useWeb3React } from '@web3-react/core'
import { NetworkContextName } from '../../constants'
import React from 'react'
import { UIContainerContextProps } from 'contexts/UIContainerContext'
import { useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'

/**
 * This HOC injects UIContainerContext as props to the underlying component
 * @param Component Most likely dapp(s)
 */
const withUIContainerContext = <P extends object>(
    Component: React.ComponentType<P & UIContainerContextProps>
): React.FC<P & UIContainerContextProps> => (props: P) => {
    const walletContext = useWeb3React()
    const networkContext = useWeb3React(NetworkContextName)
    const transactions = useAllTransactions()
    const addTransaction = useTransactionAdder()

    return (
        <Component
            {...props}
            walletContext={walletContext}
            networkContext={networkContext}
            walletState={{ transactions, addTransaction }}
        />
    )
}

export default withUIContainerContext
