import Web3 from "web3";
import { Chain } from "wagmi";

export type NetworkType = "eth" | "goerli" | "polygon" | "celo";

export const NETWORK: Record<NetworkType, NetworkType> = {
    eth: "eth",
    goerli: "goerli",
    polygon: "polygon",
    celo: "celo",
};

export const networkNames = {
    [NETWORK.eth]: "Ethereum",
    [NETWORK.polygon]: "Polygon",
    [NETWORK.goerli]: "Goerli",
    [NETWORK.celo]: "Celo",
};

const inverse = (obj: Record<any, any>) => Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));

export const idToNetwork: Record<number, NetworkType> = {
    1: NETWORK.eth,
    5: NETWORK.goerli,
    137: NETWORK.polygon,
    42220: NETWORK.celo,
};

export const networkToId: Record<NetworkType, number> = inverse(idToNetwork);

export const networkInfo = {
    [NETWORK.eth]: {
        chainName: "Ethereum Mainnet",
        chainId: Web3.utils.toHex(networkToId[NETWORK.eth]),
        blockExplorerUrls: ["https://etherscan.io"],
        rpcUrls: ["https://eth.llamarpc.com", `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
    },
    [NETWORK.goerli]: {
        chainName: "Goerli",
        chainId: Web3.utils.toHex(networkToId[NETWORK.goerli]),
        blockExplorerUrls: ["https://goerli.etherscan.io"],
        rpcUrls: [`https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`],
        nativeCurrency: {
            name: "GoerliETH",
            symbol: "GoerliETH",
            decimals: 18,
        },
    },
    [NETWORK.polygon]: {
        chainName: "Polygon Mainnet",
        chainId: Web3.utils.toHex(networkToId[NETWORK.polygon]),
        rpcUrls: [
            "https://polygon-rpc.com/",
            `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
        ],
        blockExplorerUrls: ["https://polygonscan.com/"],
        nativeCurrency: {
            name: "MATIC Token",
            symbol: "MATIC Token",
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
    [NETWORK.celo]: generateWagmiCustomNetwork(NETWORK.celo),
};

export const changeNetworkAtMetamask = async (networkName: NetworkType) => {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(networkToId[networkName]) }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        // @ts-ignore
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [networkInfo[networkName]],
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
