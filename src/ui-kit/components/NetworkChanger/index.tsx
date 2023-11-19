import React, { FC } from "react";
import { useNetwork } from "wagmi";

import { NetworkImage } from "../NetworkImage";
import { ButtonGray } from "../ButtonGray";
import { idToNetwork, networkNames } from "../../../utils/network";

import "./styles.scss";

type Props = {
    onClick: () => void;
};

export const NetworkChanger: FC<Props> = ({ onClick }) => {
    const { chain } = useNetwork();
    const networkName = chain?.id ? idToNetwork[chain?.id] : undefined;

    return (
        <ButtonGray onClick={onClick} disabled={!chain?.id} className="network-changer">
            <NetworkImage chainId={chain?.id} width={24} height={24} />
            <div className="network-changer__value">{networkName ? networkNames[networkName] : "WRONG NETWORK"}</div>
        </ButtonGray>
    );
};
