import { useContext } from 'react'
import { UIContainerContext } from '@weidaiecosystem/behodler-sdk'
import { WalletState } from '@weidaiecosystem/behodler-sdk/dist/types/wallet'

export const useWalletState = ():WalletState => useContext(UIContainerContext).walletState
