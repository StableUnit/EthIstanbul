import React, { useContext } from "react";
import Modal from "react-modal";
import cn from "classnames";

import "./styles.scss";
import { useNetwork } from "wagmi";
import { DispatchContext, StateContext } from "../../reducer/constants";
import {
    changeNetworkAtMetamask,
    idToNetwork,
    NETWORK,
    networkNames,
    networkToId,
    NetworkType,
} from "../../utils/network";
import { NetworkImage } from "../../ui-kit/components/NetworkImage";
import { CloseIcon } from "../../ui-kit/images/icons";
import { Actions } from "../../reducer";
import { ArrowRightIcon, ConnectedIcon } from "../../ui-kit/images";

export const NetworkModal = () => {
    const { chain } = useNetwork();
    const { isNetworkModalVisible } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const chainId = chain?.id;

    const renderIcon = (network: NetworkType) => {
        if (chainId && idToNetwork[chainId] === network) {
            return <ConnectedIcon />;
        }

        return <ArrowRightIcon />;
    };

    const handleClose = () => {
        dispatch({ type: Actions.SetIsNetworkModalVisible, payload: false });
    };

    return (
        <Modal
            isOpen={isNetworkModalVisible}
            onRequestClose={handleClose}
            className="network-modal"
            overlayClassName="network-modal-overlay"
        >
            <CloseIcon className="network-modal__close" onClick={handleClose} />
            <div className="network-modal__title">Change a network</div>
            {Object.keys(NETWORK).map((network) => {
                const selectedNetworkId = networkToId[network as NetworkType];

                return (
                    <div
                        key={network}
                        className={cn("network-modal__network", {
                            "network-modal__network--selected": chainId && idToNetwork[chainId] === network,
                        })}
                        onClick={() => changeNetworkAtMetamask(selectedNetworkId)}
                    >
                        <div className="network-modal__network__content">
                            <NetworkImage chainId={selectedNetworkId} width={28} height={28} />
                            <div className="network-modal__network__name">{networkNames[network]}</div>
                        </div>
                        {renderIcon(network as NetworkType)}
                    </div>
                );
            })}
        </Modal>
    );
};
