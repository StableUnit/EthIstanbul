import React from "react";
import "./styles.scss";
import Button from "../../ui-kit/components/Button/Button";

type TokenInfo = {
    tokenA: string;
    tokenB: string;
    earned: number;
    APR: number;
    supply: number;
    deposit: number;
};

export const PoolsPage = () => {
    const data = [
        {
            tokenA: "GROK",
            tokenB: "ETH",
            earned: 0,
            APR: 153,
            supply: 15_030_436,
            deposit: 0,
        },
        {
            tokenA: "SOME",
            tokenB: "ETH",
            earned: 0,
            APR: 900,
            supply: 10_045_010_025,
            deposit: 0,
        },
    ] as TokenInfo[];

    const handleDeposit = (info: TokenInfo) => () => {
        console.log("earn", info.tokenA, info.tokenB);
    };

    return (
        <div className="pool">
            <img className="pool__image" src="/img/Earn.png" />
            <Button className="pool__earn-button" text="Create a pool" width={150} padding="1px" />

            <div className="pool__table">
                {data.map((v) => (
                    <div className="pool__table__line">
                        <div className="pool__table__line__section">
                            <div className="pool__table__line__title">Name</div>
                            {v.tokenA}-{v.tokenB}
                        </div>
                        <div className="pool__table__line__section">
                            <div className="pool__table__line__title">Earned</div>
                            {v.earned} {v.tokenB}
                        </div>
                        <div className="pool__table__line__section">
                            <div className="pool__table__line__title">APR</div>
                            Up to {v.APR}%
                        </div>
                        <div className="pool__table__line__section">
                            <div className="pool__table__line__title">Supply</div>
                            {v.supply.toLocaleString()} {v.tokenA}
                        </div>
                        <div className="pool__table__line__section">
                            <div className="pool__table__line__title">My deposit</div>
                            {v.deposit}
                        </div>
                        <div className="pool__table__line__section">
                            <Button text="Earn" onClick={handleDeposit(v)} width={190} padding="1px" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
