import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import { useLingui } from '@lingui/react'

import { network, SUPPORTED_NETWORK_CHAIN_IDS } from '../../connectors'
import { NetworkContextName } from '../../constants'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import Loader from '../Loader'
import { useWalletModalToggle } from '../../state/application/hooks'

const MessageWrapper = styled.div`
    align-items: center;
    display: flex;
    height: 20rem;
    justify-content: center;
    padding: 16px;
    text-align: center;
`

const Message = styled.h2`
    color: ${({ theme }) => theme.text2};
`

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
    const { i18n } = useLingui()
    const { active, chainId } = useWeb3React()
    const { active: networkActive, error: networkError, activate: activateNetwork, account } = useWeb3React(NetworkContextName)

    // try to eagerly connect to an injected provider, if it exists and has granted access already
    const triedEager = useEagerConnect()

    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (triedEager && !networkActive && !networkError && !active) {
            activateNetwork(network)
        }
    }, [triedEager, networkActive, networkError, activateNetwork, active])

    // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
    useInactiveListener(!triedEager)

    // handle delayed loader state
    const [showLoader, setShowLoader] = useState(false)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(true)
        }, 600)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    // on page load, do nothing until we've tried to connect to the injected connector
    if (!triedEager) {
        return null
    }

    // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
    if (chainId && !SUPPORTED_NETWORK_CHAIN_IDS.includes(chainId)) {
        return (
            <MessageWrapper>
                <Message>
                    {i18n._(
                        t`Unsupported network detected. Please switch to Ethereum mainnet.`
                    )}
                </Message>
            </MessageWrapper>
        )
    }

    // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
    if (!active && networkError) {
        return (
            <MessageWrapper>
                <Message>
                    {i18n._(
                        t`You are not connected to a blockchain. Connect your wallet to use Behodler.`
                    )}
                </Message>
            </MessageWrapper>
        )
    }

    // if neither context is active, spin
    if (!active && !networkActive) {
        return showLoader ? (
            <MessageWrapper>
                <Loader />
            </MessageWrapper>
        ) : null
    }

    return children
}
