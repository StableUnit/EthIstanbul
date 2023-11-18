import { useFeeData } from "wagmi";

export const useGasPrice = (chainId?: number) => {
    const fee = useFeeData({ chainId });

    return fee.data?.gasPrice;
};
