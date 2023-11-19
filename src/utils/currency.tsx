import React from "react";

import tokenList from "../submodule-contract-artifacts/tokenlist.json";

export const getSupportedTokens = (chainId: number) => tokenList.tokens.filter((v) => v.chainId === chainId);
export const getSupportedTokensAddresses = (chainId: number) => getSupportedTokens(chainId).map((v) => v.address);
export const getSupportedTokensAddressesNoSU = (chainId: number) => getSupportedTokens(chainId).map((v) => v.address);

export const getTokenByName = (name: string, chainId: number | undefined) =>
    tokenList.tokens.find((v) => v.symbol === name && v.chainId === chainId);

export const getAddress = (name: string, chainId: number | undefined) => getTokenByName(name, chainId)?.address;

export const getName = (address: string, chainId: number | undefined) =>
    tokenList.tokens.find((v) => v.address === address && v.chainId === chainId)?.symbol as string | undefined;

export const getDecimals = (name: string, chainId: number | undefined) => getTokenByName(name, chainId)?.decimals;
