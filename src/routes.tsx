import React from 'react'
import { Redirect, Route, RouteComponentProps, useLocation, Switch } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { RedirectToSwap, RedirectPathToSwapOnly  } from '@behodler/swap'
import DappsNavigation from "@behodler/dapps-navigation-page";
import { BehodlerUISwap } from '@behodler/swap-legacy'
import { BehodlerUIPyrotokens } from '@behodler/pyrotokens-legacy'
import styled from 'styled-components'

import Connect from './pages/Connect'
import Transactions from './pages/Transactions'
import ComingSoon from './components/ComingSoon'

const StyledDappsNavigationWrapper = styled.div`
  background-color: rgba(2,5,26,1);

  @media (min-width: 976px) {
    padding-top: 120px;
    position: relative;
  }
  
  div.bg-bottom {
    background-position: bottom;
    height: 100vh;
    width: 100vw;

    @media (min-width: 976px) {
      top: 120px !important;
    }
  }
`

const AppsPage = (props: any) => (
    <StyledDappsNavigationWrapper>
        <DappsNavigation {...props} />
    </StyledDappsNavigationWrapper>
);

function Routes(): JSX.Element {
    return (
        <Switch>
            <PublicRoute exact path="/connect" component={Connect} />

            {/* Pages */}
            <Route exact strict path="/apps" component={AppsPage} />
            <Route exact strict path="/trade" component={BehodlerUISwap} />
            <Route exact strict path="/swap" component={BehodlerUISwap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/transactions" component={Transactions} />
            <Route exact strict path="/bonfire" component={ComingSoon} />
            <Route exact strict path="/limbo" component={ComingSoon} />
            <Route exact strict path="/analytics" component={ComingSoon} />
            <Route exact strict path="/pyrotokens" component={BehodlerUIPyrotokens} />

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
            <Route component={RedirectPathToSwapOnly} />
        </Switch>
    )
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
