import React from 'react'
import { Redirect, Route, RouteComponentProps, useLocation, Switch } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { RedirectToSwap, RedirectPathToSwapOnly  } from '@behodler/swap'
import DappsNavigation from "@behodler/dapps-navigation-page";
import { BehodlerUISwap, UIContainerContextDevProvider } from "behodler-ui";

import Connect from './pages/Connect'
import Transactions from './pages/Transactions'

const ConnectedSwap = (props: any) => (
    <UIContainerContextDevProvider>
        <BehodlerUISwap {...props} />
    </UIContainerContextDevProvider>
)

function Routes(): JSX.Element {
    return (
        <Switch>
            <PublicRoute exact path="/connect" component={Connect} />

            {/* Pages */}
            <Route exact strict path="/apps" component={DappsNavigation} />
            <Route exact strict path="/trade" component={ConnectedSwap} />
            <Route exact strict path="/swap" component={ConnectedSwap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/transactions" component={Transactions} />

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
