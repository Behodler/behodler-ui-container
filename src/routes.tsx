import React, { useEffect, useState } from 'react'
import { Redirect, Route, RouteComponentProps, useLocation, Switch } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import DappsNavigation from "@behodler/dapps-navigation-page";
import { BehodlerUISwap } from '@behodler/swap-legacy'
import { Swap } from '@behodler/pyrotokens-legacy'
import { network } from './connectors'
import Connect from './pages/Connect'
import ComingSoon from './components/ComingSoon'
import { useEagerConnect, useInactiveListener } from 'hooks';
import { useWeb3React } from '@web3-react/core';
import { NetworkContextName } from './constants';
import styled from 'styled-components'
import Loader from 'components/Loader';

const MessageWrapper = styled.div`
    align-items: center;
    display: flex;
    height: 20rem;
    justify-content: center;
    padding: 16px;
    text-align: center;
`

const Message = styled.h2`
    color: ${({ theme }) => theme.secondary1};
`
function Routes(): JSX.Element {
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

      if (!triedEager) {
        return <div></div>
    }

   // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
   if (!active && networkError) {
    return (
        <MessageWrapper>
            <Message>
            You are not connected to a blockchain. Connect your wallet to use Behodler.
                
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
    ) : <div></div>
}


    return (
        <Switch>
            <PublicRoute exact path="/connect" component={Connect} />

            {/* Pages */}
            <Route exact strict path="/apps" component={DappsNavigation} />
            <ChainRoute approvedChains={[1]} chainId={chainId} exact strict path="/trade" component={BehodlerUISwap} />
            <ChainRoute approvedChains={[1]} chainId={chainId} exact strict path="/swap" component={BehodlerUISwap} />
          
            <Route exact strict path="/bonfire" component={ComingSoon} />
          
            <Route exact strict path="/limbo" component={ComingSoon} />
            <Route exact strict path="/analytics" component={ComingSoon} />
            <ChainRoute exact strict path="/pyrotokens" approvedChains={[1,11155111]} chainId={chainId}  component={Swap} />

            {/* Redirects for app routes */}
            <Route
                exact
                strict
                path="/token/:address"
                render={({
                    match: {
                        params: { address }
                    }
                }) => <Redirect to={`/swap/${address}`} />}
            />

            {/* Catch all */}
            {/* <Route component={RedirectPathToSwapOnly} /> */}
        </Switch>
    )
}
interface ChainRouteProps{
exact?:boolean
strict?:boolean
path:string
approvedChains:number[]
chainId?:number
component:any
}

function ChainRoute(props:ChainRouteProps):JSX.Element{
    const chainApproved:boolean = props.approvedChains
                                    .filter(c => c===props.chainId).length>0
     if (props.chainId && !chainApproved) {
        return (
            <MessageWrapper>
                <Message>
                Unsupported network detected. Please switch to Ethereum mainnet.
                </Message>
            </MessageWrapper>
        )
        }
    return <Route exact={props.exact} strict = {props.strict} path={props.path} component={props.component}/>
}

export default Routes

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
export const PublicRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    const location = useLocation<any>()
    return (
        <>
            <Route
                {...rest}
                render={(props: RouteComponentProps) =>
                    account ? (
                        <Redirect
                            to={{
                                pathname: location.state ? location.state.from.pathname : '/'
                            }}
                        />
                    ) : Component ? (
                        <Component {...props} />
                    ) : (
                        children
                    )
                }
            />
        </>
    )
}

// A wrapper for <Route> that redirects to the Connect Wallet
// screen if you're not yet authenticated.
export const WalletRoute = ({ component: Component, children, ...rest }: any) => {
    const { account } = useActiveWeb3React()
    return (
        <>
            <Route
                {...rest}
                render={({ location, props, match }: any) => {
                    return account ? (
                        Component ? (
                            <Component {...props} {...rest} match={match} />
                        ) : (
                            children
                        )
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/connect',
                                state: { from: location }
                            }}
                        />
                    )
                }}
            />
        </>
    )
}
