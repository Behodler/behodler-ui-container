import { Contract } from '@ethersproject/contracts'
import SUSHIROLL_ABI from '@sushiswap/core/abi/SushiRoll.json'
import {
    BAR_ADDRESS,
    ChainId,
    MAKER_ADDRESS,
    MASTERCHEF_ADDRESS,
    SUSHI_ADDRESS
} from '@sushiswap/sdk'
import { useMemo } from 'react'
import {
    ARGENT_WALLET_DETECTOR_ABI,
    ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
} from '../constants/abis/argent-wallet-detector'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import BAR_ABI from '../constants/abis/bar.json'
import MAKER_ABI from '../constants/abis/maker.json'
import MASTERCHEF_ABI from '../constants/abis/masterchef.json'
import SAAVE_ABI from '../constants/abis/saave.json'
import SUSHI_ABI from '../constants/abis/sushi.json'
import { getContract } from '../utils'
import { useActiveWeb3React } from './useActiveWeb3React'

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useActiveWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(
        chainId === ChainId.MAINNET ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
        ARGENT_WALLET_DETECTOR_ABI,
        false
    )
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
    const { chainId } = useActiveWeb3React()
    let address: string | undefined
    if (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
            case ChainId.GÖRLI:
            case ChainId.ROPSTEN:
            case ChainId.RINKEBY:
                address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
                break
        }
    }
    return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
    return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export function useSushiContract(withSignerIfPossible = true): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId && SUSHI_ADDRESS[chainId], SUSHI_ABI, withSignerIfPossible)
}

export function useMasterChefContract(withSignerIfPossible?: boolean): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId && MASTERCHEF_ADDRESS[chainId], MASTERCHEF_ABI, withSignerIfPossible)
}

export function useSushiBarContract(withSignerIfPossible?: boolean): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId && BAR_ADDRESS[chainId], BAR_ABI, withSignerIfPossible)
}

export function useMakerContract(): Contract | null {
    const { chainId } = useActiveWeb3React()
    return useContract(chainId && MAKER_ADDRESS[chainId], MAKER_ABI, false)
}

// experimental:
export function useSaaveContract(withSignerIfPossible?: boolean): Contract | null {
    return useContract('0x364762C00b32c4b448f39efaA9CeFC67a25603ff', SAAVE_ABI, withSignerIfPossible)
}

export function useSushiRollContract(version: 'v1' | 'v2' = 'v2'): Contract | null {
    const { chainId } = useActiveWeb3React()
    let address: string | undefined
    if (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                address = '0x16E58463eb9792Bc236d8860F5BC69A81E26E32B'
                break
            case ChainId.ROPSTEN:
                address = '0xCaAbdD9Cf4b61813D4a52f980d6BC1B713FE66F5'
                break
            case ChainId.BSC:
                if (version === 'v1') {
                    address = '0x677978dE066b3f5414eeA56644d9fCa3c75482a1'
                } else if (version === 'v2') {
                    address = '0x2DD1aB1956BeD7C2d938d0d7378C22Fd01135a5e'
                }
                break
            case ChainId.MATIC:
                address = '0x0053957E18A0994D3526Cf879A4cA7Be88e8936A'
                break
        }
    }
    return useContract(address, SUSHIROLL_ABI, true)
}

// export function usePancakeRollV1Contract(): Contract | null {
//     return useContract('0x677978dE066b3f5414eeA56644d9fCa3c75482a1', SUSHIROLL_ABI, true)
// }

// export function usePancakeRollV2Contract(): Contract | null {
//     return useContract('', SUSHIROLL_ABI, true)
// }

