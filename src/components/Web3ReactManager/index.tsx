import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import { network } from '../../connectors'
import { NetworkContextName } from '../../constants'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import Loader from '../Loader'
import { useLingui } from '@lingui/react'
import { Web3StatusConnect, Text as Web3StatusText } from '../Web3Status'
import { useWalletModalToggle } from '../../state/application/hooks'

const MessageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20rem;
`

const Message = styled.h2`
    color: ${({ theme }) => theme.secondary1};
`

const StyledNetworkErrorWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledWeb3StatusConnect = styled(Web3StatusConnect)`
  margin-top: 10px;
  width: auto;
`

export default function Web3ReactManager({ children }: { children: JSX.Element }) {
    const { i18n } = useLingui()
    const { active, chainId } = useWeb3React()
    const { active: networkActive, error: networkError, activate: activateNetwork, account } = useWeb3React(NetworkContextName)
    const toggleWalletModal = useWalletModalToggle()
    console.info('web3', {
        chainId
    });

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
    if (chainId && chainId !== 1) {
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
                <StyledNetworkErrorWrapper>

                    <Message>
                        {i18n._(
                            t`Connect your wallet to Behodler.`
                        )}
                    </Message>

                    <StyledWeb3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
                        <Web3StatusText className="hidden sm:block">{i18n._(t`Connect to a wallet`)}</Web3StatusText>
                    </StyledWeb3StatusConnect>

                </StyledNetworkErrorWrapper>
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
