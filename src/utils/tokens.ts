import BN from "bn.js";

export const beautifyTokenBalance = (balance: string, decimals: number, fraction = 5) => {
    const exp = 10 ** fraction;

    return (+balance.slice(0, -decimals + fraction) / exp).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: fraction,
    });
};

export const fromHRToBN = (n: number, decimals: number) => {
    const MAX_SMALL_DECIMAL = 6;
    if (decimals <= MAX_SMALL_DECIMAL) {
        return new BN(10).pow(new BN(decimals)).muln(n);
    }

    const multiplierSmall = new BN(10).pow(new BN(MAX_SMALL_DECIMAL));
    const multiplierMain = new BN(10).pow(new BN(decimals - MAX_SMALL_DECIMAL));

    return multiplierSmall.muln(n).mul(multiplierMain);
};

export const toHRNumber = (bn: BN, decimal = 0) => bn.div(new BN(10).pow(new BN(decimal))).toNumber();
export const toHRNumberFloat = (bn: BN, decimal = 0) => toHRNumber(bn.muln(1000), decimal) / 1000;
