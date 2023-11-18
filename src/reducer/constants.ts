import React from "react";
import { ActionType, ReducerState } from "./index";

export const initialState: ReducerState = {
    uiSelectedChainId: 1,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<ActionType>>(() => null);
