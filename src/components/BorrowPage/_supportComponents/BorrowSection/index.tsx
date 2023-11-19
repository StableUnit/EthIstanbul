import React, { ChangeEvent, useEffect, useState } from "react";

import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

import EthImage from "../../../../ui-kit/images/eth.png";
import Button from "../../../../ui-kit/components/Button/Button";
import { ReactComponent as ArrowDownIcon } from "../../../../ui-kit/images/arrow-down.svg";

import "./styles.scss";
import { addSuccessNotification } from "../../../../utils/notifications";

const isRatherEqual = (a: number, b: number) => {
    return Math.abs(a - b) < 0.00001;
};

export const BorrowSection = () => {
    const liqPriceUSD = 0.009;
    const liqPriceETH = 0.0007;
    const coinPriceInETH = 0.0002;
    const [supply, setSupply] = useState<number>();
    const [borrow, setBorrow] = useState<number>();
    const [mainBalance, setMainBalance] = useState<number>(5);
    const [APR, setAPR] = useState<number>(15);
    const [selectedToken, setSelectedToken] = useState<string>(); // address
    const coins = [
        {
            token_address: "0x00",
            logo: "grok.png",
            symbol: "GROK",
        },
    ];

    useEffect(() => {
        console.log(
            "supply",
            borrow,
            supply,
            (borrow ?? 0) * coinPriceInETH,
            isRatherEqual((borrow ?? 0) * coinPriceInETH, supply ?? 0)
        );
        if (!selectedToken) {
            return;
        }
        if (supply !== undefined && !isRatherEqual((borrow ?? 0) * coinPriceInETH, supply)) {
            setBorrow(supply / coinPriceInETH);
        }
        if (supply === undefined && borrow !== undefined) {
            setBorrow(0);
        }
    }, [supply, selectedToken]);

    useEffect(() => {
        console.log(
            "borrow",
            borrow,
            supply,
            (borrow ?? 0) * coinPriceInETH,
            isRatherEqual(borrow * coinPriceInETH, supply ?? 0)
        );
        if (!selectedToken) {
            return;
        }
        if (borrow !== undefined && !isRatherEqual(borrow * coinPriceInETH, supply ?? 0)) {
            setSupply(borrow * coinPriceInETH);
        }
        if (borrow === undefined && supply !== undefined) {
            setSupply(0);
        }
    }, [borrow]);

    const handleSupplyChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.value === "") {
            setSupply(undefined);
        } else {
            setSupply(+event.target.value);
        }
    };
    const handleBorrowChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.value === "") {
            setBorrow(undefined);
        } else {
            setBorrow(+event.target.value);
        }
    };
    const handleTokenChange = (event: SelectChangeEvent) => {
        setSelectedToken(event.target.value);
    };

    const handleBorrow = () => {
        addSuccessNotification("Borrow success");
    };

    return (
        <div className="borrow-section">
            <div className="borrow-section__input-data">
                <div className="borrow-section__input-data__title">You supply</div>
                <div className="borrow-section__input-data__content">
                    <div>
                        <TextField
                            id="supply"
                            className="borrow-section__input-data__supply"
                            placeholder="0.00"
                            type="number"
                            onChange={handleSupplyChange}
                            value={supply?.toString()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className="borrow-section__input-data__value">
                            {((supply ?? 0) * 2045.2).toLocaleString()}$
                        </div>
                    </div>
                    <div className="borrow-section__input-data__token-info">
                        <div className="borrow-section__input-data__main-asset">
                            <img src={EthImage} /> ETH
                        </div>
                        <div className="borrow-section__input-data__value">
                            Balance {mainBalance.toLocaleString()} ETH
                        </div>
                    </div>
                </div>
            </div>
            <div className="borrow-section__input-data">
                <div className="borrow-section__input-data__title">You borrow</div>
                <div className="borrow-section__input-data__content">
                    <div>
                        <TextField
                            id="supply"
                            className="borrow-section__input-data__supply"
                            placeholder="0.00"
                            type="number"
                            onChange={handleBorrowChange}
                            value={borrow?.toString()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className="borrow-section__input-data__value">
                            {((borrow ?? 0) * 0.409).toLocaleString()}$
                        </div>
                    </div>
                    <div>
                        <div className="borrow-section__input-data__main-asset">
                            <FormControl className="borrow-section-form">
                                <Select
                                    value={selectedToken || "placeholder-value" || "custom-value"}
                                    onChange={handleTokenChange}
                                    inputProps={{ "aria-label": "Without label" }}
                                    IconComponent={ArrowDownIcon}
                                    MenuProps={{
                                        classes: {
                                            root: "borrow-section-form__token-dropdown",
                                            paper: "borrow-section-form__paper",
                                            list: "borrow-section-form__list",
                                        },
                                    }}
                                >
                                    <MenuItem disabled value="placeholder-value">
                                        Select token
                                    </MenuItem>
                                    {coins.map((token) => (
                                        <MenuItem key={token.token_address} value={token.token_address}>
                                            <img
                                                className="borrow-section-form__token-form__logo"
                                                src={token.logo ?? "/default.svg"}
                                                onError={({ currentTarget }) => {
                                                    // eslint-disable-next-line no-param-reassign
                                                    currentTarget.onerror = null; // prevents looping
                                                    // eslint-disable-next-line no-param-reassign
                                                    currentTarget.src = "/default.svg";
                                                }}
                                            />
                                            <div className="borrow-section-form__token-form__symbol">
                                                {token.symbol}
                                            </div>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="borrow-section__input-data__value">Daily Interest Rate: {APR}%</div>
                    </div>
                </div>
            </div>
            <div className="borrow-section__liquidation">
                Liquidation price: ${liqPriceUSD} ({liqPriceETH} ETH)
            </div>
            <Button onClick={handleBorrow} text="Borrow" padding="1px" />
        </div>
    );
};
