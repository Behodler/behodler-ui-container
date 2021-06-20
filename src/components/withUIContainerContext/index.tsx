import { useWeb3React } from '@web3-react/core'
import { NetworkContextName } from '../../constants'
import React from 'react'
import { UIContainerContextProps } from 'contexts/UIContainerContext'

/**
 * This HOC injects UIContainerContext as props to the underlying component
 * @param Component Most likely dapp(s)
 */
const withUIContainerContext = <P extends object>(
    Component: React.ComponentType<P & UIContainerContextProps>
): React.FC<P & UIContainerContextProps> => (props: P) => {
    const walletContext = useWeb3React()
    const networkContext = useWeb3React(NetworkContextName)

    return <Component {...props} walletContext={walletContext} networkContext={networkContext} />
}

export default withUIContainerContext