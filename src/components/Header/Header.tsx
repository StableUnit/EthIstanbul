import React from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import { useAccount } from "wagmi";
import { getShortAddress } from "../../utils/wallet";
import { GradientHref } from "../../ui-kit/components/GradientHref";
import { useDevice } from "../../hooks/useDimensions";
import { LinkType } from "./supportComponents/MenuModal";
import { HeaderInfo } from "./supportComponents/HeaderInfo";

import "./Header.scss";

interface NavbarProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

const LINKS = [
    {
        href: "/borrow",
        text: "Borrow",
    },
    {
        href: "/pools",
        text: "Pools",
    },
] as LinkType[];

const Header = ({ onConnect, onDisconnect }: NavbarProps) => {
    const { address } = useAccount();
    const { isMobile } = useDevice();
    const location = useLocation();

    return (
        <div className="header">
            <HeaderInfo />

            <div className="header__navbar">
                {!isMobile && (
                    <div className="header__links">
                        {LINKS.map(({ href, text, isExternal }) => {
                            const isSelected = location.pathname.includes(href);
                            return (
                                <GradientHref
                                    id={`links-${text.toLowerCase()}`}
                                    className={cn("header__link", { "header__link--selected": isSelected })}
                                    key={text}
                                    href={href}
                                    isExternal={isExternal}
                                    target={isExternal ? "_blank" : undefined}
                                    disabled={isSelected}
                                >
                                    {text}
                                </GradientHref>
                            );
                        })}
                    </div>
                )}
                {address ? (
                    <div className="header__address" onClick={onDisconnect}>
                        <span className="header__address-text">{getShortAddress(address)}</span>
                        <span className="header__address-disconnect">Disconnect</span>
                    </div>
                ) : (
                    <div className="header__button" onClick={onConnect} id="connect-button">
                        Connect wallet
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
