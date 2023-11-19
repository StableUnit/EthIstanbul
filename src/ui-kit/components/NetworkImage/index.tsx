import React from "react";
import DefaultImage from "../../images/default.png";
import PolygonImage from "../../images/polygon.png";
import CeloImage from "../../images/celo.jpg";
import { idToNetwork, NetworkType } from "../../../utils/network";

interface NetworkImageProps {
    chainId?: number;
    width?: number;
    height?: number;
}

const getNetworkImage = (network?: NetworkType) => {
    switch (network) {
        case "polygonZK":
            return PolygonImage;
        case "celo":
            return CeloImage;
        default:
            return DefaultImage;
    }
};

export const NetworkImage = ({ chainId, width = 32, height = 32 }: NetworkImageProps) => {
    if (!chainId) {
        return null;
    }

    return <img src={getNetworkImage(idToNetwork[chainId])} width={width} height={height} alt={idToNetwork[chainId]} />;
};

// export const NetworkImage = ({ chainId, width = 32, height = 32 }: NetworkImageProps) => {
//     if (!chainId) {
//         return null;
//     }
//
//     const Icon = getNetworkImage(idToNetwork[chainId]);
//     // @ts-ignore
//     return <Icon width={width} height={height} />;
// };
