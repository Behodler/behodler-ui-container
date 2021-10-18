import React, { Suspense, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { swapBackgroundImage } from '@behodler/swap-legacy'
import { parse } from 'qs'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import ReactGA from 'react-ga'

import { AppBar, Polling, Popups } from '../components'
import Web3ReactManager from '../components/Web3ReactManager'
import Routes from '../routes'
import { AppDispatch } from '../state'
import { updateUserDarkMode } from '../state/user/actions'

const StyledApp = styled.div`
  background: #19143C url(${swapBackgroundImage}) 50% 0 repeat;
  background-size: cover;
`

function App(): JSX.Element {
    const bodyRef = useRef<any>(null)

    const { pathname, search } = useLocation()

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.scrollTo(0, 0)
        }
    }, [pathname])

    useEffect(() => {
        ReactGA.pageview(`${pathname}${search}`)
    }, [pathname, search])

    useEffect(() => {
        if (!search) return
        if (search.length < 2) return

        const parsed = parse(search, {
            parseArrays: false,
            ignoreQueryPrefix: true
        })

        const theme = parsed.theme

        if (typeof theme !== 'string') return

        if (theme.toLowerCase() === 'light') {
            dispatch(updateUserDarkMode({ userDarkMode: false }))
        } else if (theme.toLowerCase() === 'dark') {
            dispatch(updateUserDarkMode({ userDarkMode: true }))
        }
    }, [dispatch, search])

    return (
        <Suspense fallback={null}>
            <StyledApp className="flex flex-col items-start overflow-x-hidden h-screen">
                <AppBar />
                <div ref={bodyRef} className="flex flex-col flex-1 items-center justify-start w-screen h-full overflow-y-auto overflow-x-hidden z-0 lg:pb-0">
                    <Popups />
                    <Polling />
                    <Web3ReactManager>
                        <Routes />
                    </Web3ReactManager>
                </div>
            </StyledApp>
        </Suspense>
    )
}

export default App
