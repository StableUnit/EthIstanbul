import React, { useState } from "react";
import Button from "../../../../ui-kit/components/Button/Button";
import GROKImage from "../../../../ui-kit/images/grok.png";

import "./styles.scss";
import { addSuccessNotification } from "../../../../utils/notifications";

export const RepaySection = () => {
    const [data, setData] = useState([
        {
            name: "GROK",
            address: "0x0123",
            amount: 1251.2,
            isApproved: false,
        },
        {
            name: "SOME",
            address: "0x01233",
            amount: 2468.5,
            isApproved: false,
        },
    ]);
    const handleApprove = (tokenAddress: string) => () => {
        setData((v) => {
            const index = v.findIndex(({ address }) => tokenAddress === address);
            const result = [...v];
            if (index !== -1) {
                result[index].isApproved = true;
            }
            return result;
        });
        addSuccessNotification("Approve Success");
    };
    const handleRepay = (tokenAddress: string) => () => {
        addSuccessNotification("Repay Success");
    };
    return (
        <div className="repay-section">
            {data.map((info) => (
                <div className="repay-section__data">
                    <div className="repay-section__data__info">
                        <img className="repay-section__data__icon" src={GROKImage} width={42} height={42} />
                        <div className="repay-section__data__name">{info.name}:&nbsp;</div>
                        <div className="repay-section__data__amount">{info.amount}</div>
                    </div>
                    {info.isApproved ? (
                        <Button
                            className="repay-section__data__button"
                            text="Repay"
                            width={140}
                            padding="1px"
                            onClick={handleRepay(info.address)}
                        />
                    ) : (
                        <Button
                            className="repay-section__data__button"
                            text="Approve"
                            width={140}
                            padding="1px"
                            onClick={handleApprove(info.address)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
