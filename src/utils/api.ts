import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import BigNumber from "bignumber.js";

import LendArb from "../submodule-contract-artifacts/arbitrumOne/MeawLend.json";
import LendChiliz from "../submodule-contract-artifacts/chiliz/MeawLend.json";
import SuOracleAggregatorArb from "../submodule-contract-artifacts/arbitrumOne/SuOracleAggregator.json";
import SuOracleAggregatorChiliz from "../submodule-contract-artifacts/chiliz/SuOracleAggregator.json";

import CONTRACT_ERC20 from "../contracts/ERC20.json";

import { getAddress } from "./currency";
import { NETWORK, networkToId } from "./network";

let currentAddress: string;
export const setUtilsCurrentAddress = (newAddress: string) => {
    currentAddress = newAddress;
};

let web3: Web3;
export const setUtilsWeb3 = (newWeb3?: Web3) => {
    web3 = newWeb3 === undefined ? new Web3(Web3.givenProvider) : newWeb3;
};

const getLend = (chainId: number) => {
    switch (chainId) {
        case networkToId[NETWORK.arbitrum]:
            return LendArb;
        case networkToId[NETWORK.chiliz]:
            return LendChiliz;
        default:
            return {} as any;
    }
};

const getOracle = (chainId: number) => {
    switch (chainId) {
        case networkToId[NETWORK.arbitrum]:
            return SuOracleAggregatorArb;
        case networkToId[NETWORK.chiliz]:
            return SuOracleAggregatorChiliz;
        default:
            return {} as any;
    }
};

type ContractsType = "Lend" | "SuOracleAggregator";

export const contracts: Record<ContractsType, Contract | undefined> = {
    Lend: undefined,
    SuOracleAggregator: undefined,
};

export const setLendContract = (chainId: number) => {
    const contract = getLend(chainId);
    contracts.Lend = new web3.eth.Contract(contract.abi as any, contract.address);
};

export const setOracleAggregator = (chainId: number) => {
    const contract = getOracle(chainId);
    contracts.SuOracleAggregator = new web3.eth.Contract(contract.abi as any, contract.address);
};

const tryToRunLocal = async (command: any, options: Record<string, any> = {}) => {
    await command.estimateGas({ from: currentAddress, ...options });
    return command;
};

export const SuOracleAggregatorFactory = {
    getFiatPrice1e18: async (tokenAddress?: string) => {
        if (contracts.SuOracleAggregator && tokenAddress) {
            return new BigNumber(await contracts.SuOracleAggregator.methods.getFiatPrice1e18(tokenAddress).call());
        }

        return undefined;
    },
};

export const SuLendFactory = {
    depositCollateral: async (amount: BigNumber) => {
        if (contracts.Lend && amount && currentAddress) {
            await contracts.Lend.methods.depositCollateral().send({ from: currentAddress, value: amount });
        }
    },
    borrowToken: async (amount: BigNumber) => {
        if (contracts.Lend && amount && currentAddress) {
            await contracts.Lend.methods.borrowToken(amount).send({ from: currentAddress });
        }
    },
    repayLoanAndWithdraw: async (amount: BigNumber) => {
        if (contracts.Lend && amount && currentAddress) {
            await contracts.Lend.methods.repayLoanAndWithdraw(amount).send({ from: currentAddress });
        }
    },
    liquidateLoan: async (borrower: string) => {
        if (contracts.Lend && borrower && currentAddress) {
            await contracts.Lend.methods.liquidateLoan(borrower).send({ from: currentAddress });
        }
    },
    calculateInterest: async (tokenDebt: BigNumber, lastBorrowTime: number) => {
        if (contracts.Lend && tokenDebt) {
            return new BigNumber(await contracts.Lend.methods.calculateInterest(tokenDebt, lastBorrowTime).call());
        }
    },
    calculateInterestRate: async () => {
        if (contracts.Lend) {
            return new BigNumber(await contracts.Lend.methods.calculateInterestRate().call());
        }
    },
    isUnderCollateralized: async (borrower: string) => {
        if (contracts.Lend && borrower) {
            return new BigNumber(await contracts.Lend.methods.isUnderCollateralized(borrower).call());
        }
    },
};

export const CommonFactory = {
    createCurrencyContract: (address: string) => {
        const newWeb3 = web3 ?? new Web3(Web3.givenProvider);
        if (newWeb3 && address) {
            return new newWeb3.eth.Contract(CONTRACT_ERC20 as any, address);
        }
        return undefined;
    },
    approve: async (chainId: number, token: string | undefined, to: string, amount?: BigNumber) => {
        if (token && chainId) {
            const tokenContract = CommonFactory.createCurrencyContract(token);
            const command = await tryToRunLocal(
                tokenContract?.methods.approve(
                    to,
                    amount ?? "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                )
            );
            return command.send({ from: currentAddress });
        }
    },
    allowance: async (tokenName: string, address = currentAddress, to: string, chainId: number | undefined) => {
        if (!address || !chainId) {
            return new BigNumber(0);
        }
        const tokenContract = CommonFactory.createCurrencyContract(getAddress(tokenName, chainId) as string);
        return new BigNumber(await tokenContract?.methods.allowance(address, to).call());
    },
    totalSupply: async (token: string, chainId: number | undefined) => {
        if (token && chainId) {
            const tokenContract = CommonFactory.createCurrencyContract(token);
            return new BigNumber(await tokenContract?.methods.totalSupply().call());
        }
        return new BigNumber(0);
    },
    balance: async (tokenAddress?: string) => {
        if (!web3 || !tokenAddress || !currentAddress) {
            return new BigNumber(0);
        }

        const tokenContract = new web3.eth.Contract(CONTRACT_ERC20 as any, tokenAddress);
        return new BigNumber(await tokenContract.methods.balanceOf(currentAddress).call());
    },
};
