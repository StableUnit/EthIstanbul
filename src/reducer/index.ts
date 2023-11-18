// eslint-disable-next-line no-shadow
export enum Actions {
    SetUISelectedChainId = "SET_UI_SELECTED_CHAIN_ID",
}

export type ActionType = {
    type: Actions.SetUISelectedChainId;
    payload: number;
};

export interface ReducerState {
    uiSelectedChainId: number;
}

const reducer = (state: ReducerState, action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
        case Actions.SetUISelectedChainId:
            return {
                ...state,
                uiSelectedChainId: payload,
            };
        default:
            return state;
    }
};

export default reducer;
