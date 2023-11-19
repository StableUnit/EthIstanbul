import Web3 from "web3";
import { Chain } from "wagmi";

export type NetworkType = "chiliz" | "scroll" | "polygonZK" | "neon" | "arbitrum" | "celo";

export const NETWORK: Record<NetworkType, NetworkType> = {
    chiliz: "chiliz",
    scroll: "scroll",
    polygonZK: "polygonZK",
    neon: "neon",
    arbitrum: "arbitrum",
    celo: "celo",
};

export const networkNames = {
    [NETWORK.chiliz]: "Chiliz Spicy Testnet",
    [NETWORK.scroll]: "Scroll Sepolia Testnet",
    [NETWORK.polygonZK]: "Polygon zkEVM",
    [NETWORK.neon]: "Neon EVM DevNet",
    [NETWORK.arbitrum]: "Arbitrum One",
    [NETWORK.celo]: "Celo",
};

const inverse = (obj: Record<any, any>) => Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));

export const idToNetwork: Record<number, NetworkType> = {
    88882: NETWORK.chiliz,
    534351: NETWORK.scroll,
    1101: NETWORK.polygonZK,
    245022926: NETWORK.neon,
    42161: NETWORK.arbitrum,
    42220: NETWORK.celo,
};

export const networkToId: Record<NetworkType, number> = inverse(idToNetwork);

export const DEFAULT_NETWORK_ID = networkToId[NETWORK.arbitrum];

export const networkInfo = {
    [NETWORK.chiliz]: {
        chainName: networkNames[NETWORK.chiliz],
        chainId: Web3.utils.toHex(networkToId[NETWORK.chiliz]),
        rpcUrls: ["https://spicy-rpc.chiliz.com/"],
        blockExplorerUrls: ["https://spicy-explorer.chiliz.com/"],
        nativeCurrency: {
            name: "CHZ",
            symbol: "CHZ",
            decimals: 18,
        },
    },
    [NETWORK.scroll]: {
        chainName: networkNames[NETWORK.scroll],
        chainId: Web3.utils.toHex(networkToId[NETWORK.scroll]),
        rpcUrls: ["https://sepolia-rpc.scroll.io/"],
        blockExplorerUrls: ["https://sepolia.scrollscan.com/"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
    [NETWORK.polygonZK]: {
        chainName: networkNames[NETWORK.polygonZK],
        chainId: Web3.utils.toHex(networkToId[NETWORK.polygonZK]),
        rpcUrls: ["https://rpc.ankr.com/polygon_zkevm"],
        blockExplorerUrls: ["https://zkevm.polygonscan.com"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
    [NETWORK.neon]: {
        chainName: networkNames[NETWORK.neon],
        chainId: Web3.utils.toHex(networkToId[NETWORK.neon]),
        rpcUrls: ["https://devnet.neonevm.org"],
        blockExplorerUrls: ["https://devnet.neonscan.org"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
    [NETWORK.arbitrum]: {
        chainName: "Arbitrum One",
        chainId: Web3.utils.toHex(networkToId[NETWORK.arbitrum]),
        rpcUrls: ["https://arb1.arbitrum.io/rpc"],
        blockExplorerUrls: ["https://arbiscan.io"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
    [NETWORK.celo]: {
        chainName: "Celo Mainnet",
        chainId: Web3.utils.toHex(networkToId[NETWORK.celo]),
        rpcUrls: ["https://forno.celo.org"],
        blockExplorerUrls: ["https://celoscan.io"],
        nativeCurrency: {
            name: "CELO",
            symbol: "CELO",
            decimals: 18,
        },
    },
};

const generateWagmiCustomNetwork = (network: NetworkType) => ({
    id: +networkToId[network],
    name: networkInfo[network].chainName,
    network: networkInfo[network].chainName.toLowerCase(),
    nativeCurrency: networkInfo[network].nativeCurrency,
    rpcUrls: {
        default: { http: networkInfo[network].rpcUrls },
        public: { http: networkInfo[network].rpcUrls },
    },
    blockExplorers: {
        default: { name: `${networkInfo[network].chainName}scan`, url: networkInfo[network].blockExplorerUrls[0] },
    },
});

export const wagmiCustomNetworks: Record<string, Chain> = {
    [NETWORK.chiliz]: generateWagmiCustomNetwork(NETWORK.chiliz),
    [NETWORK.scroll]: generateWagmiCustomNetwork(NETWORK.scroll),
    [NETWORK.neon]: generateWagmiCustomNetwork(NETWORK.neon),
    [NETWORK.celo]: generateWagmiCustomNetwork(NETWORK.celo),
};

export const changeNetworkAtMetamask = async (chainId?: number) => {
    if (!chainId) {
        return;
    }
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        // @ts-ignore
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [networkInfo[idToNetwork[chainId] ?? ""]],
                });
            } catch (addError) {
                console.error(addError);
            }
        }
    }
};

export const getTrxHashLink = (hash: string, chain: NetworkType) =>
    `${networkInfo[chain].blockExplorerUrls}/tx/${hash}`;

export const getAddressLink = (address: string, chain?: NetworkType) => {
    if (!chain) {
        return;
    }
    return `${networkInfo[chain].blockExplorerUrls}/token/${address}`;
};
