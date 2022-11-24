import { ChainId, Pair, Token } from '@sushiswap/sdk'
import { useCallback, useMemo } from 'react'
import ReactGA from 'react-ga'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from 'hooks/useActiveWeb3React'
import { AppDispatch, AppState } from '..'
import {
    addSerializedToken,
    removeSerializedToken,
    SerializedPair,
    SerializedToken,
    updateUserDeadline,
    updateUserExpertMode,
    updateUserSingleHopOnly,
    updateUserSlippageTolerance
} from './actions'

function serializeToken(token: Token): SerializedToken {
    return {
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name
    }
}

function deserializeToken(serializedToken: SerializedToken): Token {
    return new Token(
        serializedToken.chainId,
        serializedToken.address,
        serializedToken.decimals,
        serializedToken.symbol,
        serializedToken.name
    )
}

export function useIsDarkMode(): boolean {
    const { userDarkMode, matchesDarkMode } = useSelector<
        AppState,
        { userDarkMode: boolean | null; matchesDarkMode: boolean }
    >(
        ({ user: { matchesDarkMode, userDarkMode } }) => ({
            userDarkMode,
            matchesDarkMode
        }),
        shallowEqual
    )

    return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useIsExpertMode(): boolean {
    return useSelector<AppState, AppState['user']['userExpertMode']>(state => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
    const dispatch = useDispatch<AppDispatch>()
    const expertMode = useIsExpertMode()

    const toggleSetExpertMode = useCallback(() => {
        dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
    }, [expertMode, dispatch])

    return [expertMode, toggleSetExpertMode]
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
    const dispatch = useDispatch<AppDispatch>()

    const singleHopOnly = useSelector<AppState, AppState['user']['userSingleHopOnly']>(
        state => state.user.userSingleHopOnly
    )

    const setSingleHopOnly = useCallback(
        (newSingleHopOnly: boolean) => {
            ReactGA.event({
                category: 'Routing',
                action: newSingleHopOnly ? 'enable single hop' : 'disable single hop'
            })
            dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
        },
        [dispatch]
    )

    return [singleHopOnly, setSingleHopOnly]
}

export function useUserSlippageTolerance(): [number, (slippage: number) => void] {
    const dispatch = useDispatch<AppDispatch>()
    const userSlippageTolerance = useSelector<AppState, AppState['user']['userSlippageTolerance']>(state => {
        return state.user.userSlippageTolerance
    })

    const setUserSlippageTolerance = useCallback(
        (userSlippageTolerance: number) => {
            dispatch(updateUserSlippageTolerance({ userSlippageTolerance }))
        },
        [dispatch]
    )

    return [userSlippageTolerance, setUserSlippageTolerance]
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
    const dispatch = useDispatch<AppDispatch>()
    const userDeadline = useSelector<AppState, AppState['user']['userDeadline']>(state => {
        return state.user.userDeadline
    })

    const setUserDeadline = useCallback(
        (userDeadline: number) => {
            dispatch(updateUserDeadline({ userDeadline }))
        },
        [dispatch]
    )

    return [userDeadline, setUserDeadline]
}

export function useAddUserToken(): (token: Token) => void {
    const dispatch = useDispatch<AppDispatch>()
    return useCallback(
        (token: Token) => {
            dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
        },
        [dispatch]
    )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
    const dispatch = useDispatch<AppDispatch>()
    return useCallback(
        (chainId: number, address: string) => {
            dispatch(removeSerializedToken({ chainId, address }))
        },
        [dispatch]
    )
}

export function useUserAddedTokens(): Token[] {
    const { chainId } = useActiveWeb3React()
    const serializedTokensMap = useSelector<AppState, AppState['user']['tokens']>(({ user: { tokens } }) => tokens)

    return useMemo(() => {
        if (!chainId) return []
        return Object.values(serializedTokensMap[chainId as ChainId] ?? {}).map(deserializeToken)
    }, [serializedTokensMap, chainId])
}

function serializePair(pair: Pair): SerializedPair {
    return {
        token0: serializeToken(pair.token0),
        token1: serializeToken(pair.token1)
    }
}

export function useURLWarningVisible(): boolean {
    return useSelector((state: AppState) => state.user.URLWarningVisible)
}

// export function toPancakeV1LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
//     return new Token(tokenA.chainId, PancakeV1Pair.getAddress(tokenA, tokenB), 18, 'UNI-V2', 'Uniswap V2')
// }

// export function toPancakeV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
//     return new Token(tokenA.chainId, PancakeV2Pair.getAddress(tokenA, tokenB), 18, 'UNI-V2', 'Uniswap V2')
// }

