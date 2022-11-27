import { TransactionResponse } from '@ethersproject/providers'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { AppDispatch, AppState } from '../index'
import { addTransaction } from './actions'
import { TransactionDetails } from './reducer'

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
    response: TransactionResponse,
    customData?: {
        summary?: string
        approval?: { tokenAddress: string; spender: string }
        claim?: { recipient: string }
    }
) => void {
    const { chainId, account } = useActiveWeb3React()
    const dispatch = useDispatch<AppDispatch>()

    return useCallback(
        (
            response: TransactionResponse,
            {
                summary,
                approval,
                claim
            }: {
                summary?: string
                claim?: { recipient: string }
                approval?: { tokenAddress: string; spender: string }
            } = {}
        ) => {
            if (!account) return
            if (!chainId) return

            const { hash } = response
            if (!hash) {
                throw Error('No transaction hash found.')
            }
            dispatch(addTransaction({ hash, from: account, chainId, approval, summary, claim }))
        },
        [dispatch, chainId, account]
    )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
    const { chainId } = useActiveWeb3React()

    const state = useSelector<AppState, AppState['transactions']>(state => state.transactions)

    return chainId ? state[chainId] ?? {} : {}
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
    return new Date().getTime() - tx.addedTime < 86_400_000
}

// returns whether a token has a pending approval transaction

// watch for submissions to claim
// return null if not done loading, return undefined if not found
