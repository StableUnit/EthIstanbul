import React from "react";
import { ActionType, ReducerState } from "./index";
import { DEFAULT_NETWORK_ID } from "../utils/network";

export const initialState: ReducerState = {
    uiSelectedChainId: DEFAULT_NETWORK_ID,
    isNetworkModalVisible: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<ActionType>>(() => null);
