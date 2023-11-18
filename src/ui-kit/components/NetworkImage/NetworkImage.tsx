import React from "react";
import DefaultImage from "../../images/default.png";
import EthImage from "../../images/eth.png";
import PolygonImage from "../../images/polygon.png";
import CeloImage from "../../images/celo.jpg";

export type NetworkType = "eth" | "goerli" | "polygon" | "celo" | string;

interface NetworkImageProps {
    network?: NetworkType;
    width?: number;
    height?: number;
}

const getNetworkImage = (network?: NetworkType) => {
    switch (network) {
        case "eth":
            return EthImage;
        case "goerli":
            return EthImage;
        case "polygon":
            return PolygonImage;
        case "celo":
            return CeloImage;
        default:
            return DefaultImage;
    }
};

export const NetworkImage = ({ network, width = 32, height = 32 }: NetworkImageProps) => (
    <img src={getNetworkImage(network)} width={width} height={height} alt={network} />
);
