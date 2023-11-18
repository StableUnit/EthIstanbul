import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { ReactNotifications } from "react-notifications-component";
import { BrowserRouter } from "react-router-dom";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, goerli } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";

import App from "./components/App/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { initialState, StateContext, DispatchContext } from "./reducer/constants";
import reducer from "./reducer";
import { wagmiCustomNetworks } from "./utils/network";

import "./index.scss";
import "react-notifications-component/dist/theme.css";

const AppContainer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const chains = [mainnet, goerli, polygon, wagmiCustomNetworks.celo];

    const { provider, webSocketProvider } = configureChains(chains, [
        infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY ?? "" }),
        publicProvider(),
    ]);

    const client = createClient({
        autoConnect: true,
        connectors: [
            new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
            new WalletConnectLegacyConnector({
                chains,
                options: {
                    qrcode: true,
                },
            }),
        ],
        provider,
        webSocketProvider,
    });

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <ErrorBoundary>
                    <ReactNotifications />
                    <BrowserRouter>
                        <WagmiConfig client={client}>
                            <App />
                        </WagmiConfig>
                    </BrowserRouter>
                </ErrorBoundary>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <AppContainer />
    </React.StrictMode>,
    document.getElementById("root")
);
