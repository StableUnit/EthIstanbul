import React from "react";
import { GradientHref } from "../../../../ui-kit/components/GradientHref";

import "./styles.scss";

export const HeaderInfo = () => {
    return (
        <div className="header-info">
            <div className="header-info__logo">
                <a href="https://safetransfer.cash/" target="_blank" rel="noreferrer">
                    <img src="/logo.svg" />
                </a>
            </div>
        </div>
    );
};
