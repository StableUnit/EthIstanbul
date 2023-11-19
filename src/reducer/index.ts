// eslint-disable-next-line no-shadow
export enum Actions {
    SetUISelectedChainId = "SET_UI_SELECTED_CHAIN_ID",
    SetIsNetworkModalVisible = "SetIsNetworkModalVisible",
}

export type ActionType =
    | {
          type: Actions.SetUISelectedChainId;
          payload: number;
      }
    | {
          type: Actions.SetIsNetworkModalVisible;
          payload: boolean;
      };

export interface ReducerState {
    uiSelectedChainId: number;
    isNetworkModalVisible: boolean;
}

const reducer = (state: ReducerState, action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
        case Actions.SetUISelectedChainId:
            return {
                ...state,
                uiSelectedChainId: payload,
            };
        case Actions.SetIsNetworkModalVisible: {
            return {
                ...state,
                isNetworkModalVisible: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
