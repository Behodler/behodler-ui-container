import { Currency, ChainId, TokenAmount } from '@sushiswap/sdk'
import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Disclosure } from '@headlessui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import { ReactComponent as Logo } from '../assets/images/logo.svg'
import { useActiveWeb3React } from '../hooks/useActiveWeb3React'
import { useETHBalances, useTokenBalancesWithLoadingIndicator } from '../state/wallet/hooks'
import { ReactComponent as Burger } from '../assets/images/burger.svg'
import { ReactComponent as X } from '../assets/images/x.svg'
import { ReactComponent as Eye } from '../assets/images/eye-logo.svg'
import ScxLogo from '../assets/images/scx-logo.png'
import { SCX, EYE } from '../constants'
import Web3Status from './Web3Status'
import { NavLink } from './Link'
import { ReactComponent as ExternalLinkIcon } from '../assets/images/link.svg'
import Loader from './Loader'

const StyledExternalLinkIcon = styled(ExternalLinkIcon)`
  display: inline-block;
  margin: -1px 4px 0 0;
  width: 17px; 
`

function AppBar(): JSX.Element {
    const { i18n } = useLingui()
    const { account, chainId, library } = useActiveWeb3React()
    const { pathname } = useLocation()
    const tokensShowBalance = [
        {
            token: SCX[ChainId.MAINNET],
            logo: <img width={24} src={ScxLogo} alt={'SCX'} />,
        },
        {
            token: EYE[ChainId.MAINNET],
            logo: <Eye />,
        },
    ]

    const [navClassList, setNavClassList] = useState(
        'w-screen bg-transparent gradiant-border-bottom z-10 backdrop-filter backdrop-blur'
    )

    const [headerClassList, setHeaderClassList] = useState(
        'flex flex-row flex-nowrap justify-between w-screen'
    )

    const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
    const [tokenBalances, isLoadingTokenBalances] = useTokenBalancesWithLoadingIndicator(account || undefined, tokensShowBalance.map(t => t.token))

    useEffect(() => {
        if (pathname === '/trade') {
            setNavClassList('w-screen bg-transparent z-10 backdrop-filter backdrop-blur')
        } else if (pathname === '/apps') {
            setNavClassList('w-screen bg-transparent z-10')
        } else {
            setNavClassList('w-screen bg-transparent gradiant-border-bottom z-10 backdrop-filter backdrop-blur')
        }

        if (pathname === '/apps') {
            setHeaderClassList('flex flex-row flex-nowrap justify-between w-screen absolute')
        } else {
            setHeaderClassList('flex flex-row flex-nowrap justify-between w-screen')
        }
    }, [pathname])

    const renderTokenBalance = (tokenAddress: string, balance?: TokenAmount) => {
        const token = tokensShowBalance.find(t => t.token?.address == tokenAddress)

        if (!token) {
            return null
        }

        let formattedBalance = balance?.toFixed(2) || '0'
        if (parseFloat(formattedBalance) === 0) {
            formattedBalance = '0'
        }

        return (
            <div className="hidden md:flex flex-row" key={tokenAddress}>
                <div>{token.logo}</div>
                <div className="pl-1.5 text-white">
                    {formattedBalance}
                </div>
            </div>
        )
    }

    return (
        <header className={headerClassList}>
            <Disclosure as="nav" className={navClassList}>
                {({ open }) => (
                    <>
                        <div className="px-4 py-0 md:py-4 bg-dark-1000 lg:bg-transparent">
                            <div className="flex items-center justify-between h-18 md:h-16 w-full">

                                <div className="flex items-center w-1/2">

                                    <div className="flex-shrink-0">
                                        <a href="https://behodler.io" rel="noreferrer" target="_blank">
                                            <Logo title="Behodler" className="w-auto" style={{ marginTop: -24 }} />
                                        </a>
                                    </div>

                                    <div className="text-white font-bold hidden sm:block" style={{ fontSize: 24 }}>
                                        <a href="https://behodler.io" rel="noreferrer" target="_blank" className="hover:text-high-emphesis">
                                            Behodler
                                        </a>
                                    </div>

                                    <div className="hidden md:block sm:ml-4">
                                        <div className="flex space-x-2">

                                            <NavLink id="swap-nav-link" to="/swap">
                                                {i18n._(t`Swap`)}
                                            </NavLink>

                                            <NavLink id="apps-nav-link" to="/apps">
                                                {i18n._(t`Apps`)}
                                            </NavLink>

                                            <a
                                                id="analytics-nav-link"
                                                href="https://analytics.behodler.io"
                                                target="blank"
                                                className="text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis p-2 md:p-3 whitespace-nowrap flex items-center"
                                            >
                                                <StyledExternalLinkIcon /> {i18n._(t`Analytics`)}
                                            </a>

                                        </div>
                                    </div>

                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                                            <span className="sr-only">{i18n._(t`Open main menu`)}</span>
                                            {open ? (
                                                <X title="Close" className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Burger title="Burger" className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>

                                </div>

                                <div className="flex flex-row items-center justify-center w-1/2 p-4 lg:p-0">
                                    <div className="flex items-center justify-between sm:justify-end space-x-5 w-full">
                                        {/*{library && library.provider.isMetaMask && (*/}
                                        {/*    <div className="hidden lg:inline-block">*/}
                                        {/*        <Web3Network />*/}
                                        {/*    </div>*/}
                                        {/*)}*/}

                                        {
                                            isLoadingTokenBalances ? (
                                                <Loader />
                                            ) : (
                                                tokensShowBalance.map(t => (
                                                    renderTokenBalance(t.token!.address, tokenBalances[t.token!.address])
                                                ))
                                            )
                                        }

                                        <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                                            {account && chainId && userEthBalance && (
                                                <div className="py-2 px-3 text-primary text-bold">
                                                    {userEthBalance?.toSignificant(4)}{' '}
                                                    {Currency.getNativeCurrencySymbol(chainId)}
                                                </div>
                                            )}
                                            <Web3Status />
                                        </div>

                                        {/*<MoreMenu />*/}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">

                                <Disclosure.Button as={NavLink} id="swap-nav-link" to="/swap">
                                    {i18n._(t`Swap`)}
                                </Disclosure.Button>

                                <Disclosure.Button as={NavLink} id="apps-nav-link" to="/apps">
                                    {i18n._(t`Apps`)}
                                </Disclosure.Button>

                                <Disclosure.Button
                                    as="a"
                                    id="analytics-nav-link"
                                    href="https://analytics.behodler.io"
                                    target="blank"
                                    className="text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis p-2 md:p-3 whitespace-nowrap flex items-center"
                                >
                                    <StyledExternalLinkIcon /> {i18n._(t`Analytics`)}
                                </Disclosure.Button>

                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </header>
    )
}

export default AppBar
