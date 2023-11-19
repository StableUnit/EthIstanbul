import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import cn from "classnames";

import { useAccount, useNetwork } from "wagmi";
import { getShortAddress } from "../../utils/wallet";
import { GradientHref } from "../../ui-kit/components/GradientHref";
import { useDevice } from "../../hooks/useDimensions";
import { LinkType } from "./supportComponents/MenuModal";
import { HeaderInfo } from "./supportComponents/HeaderInfo";

import "./Header.scss";
import { NetworkChanger } from "../../ui-kit/components/NetworkChanger";
import { Actions } from "../../reducer";
import { DispatchContext, StateContext } from "../../reducer/constants";

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
    const dispatch = useContext(DispatchContext);
    const [oldChainId, setOldChainId] = useState<number>();
    const { isNetworkModalVisible } = useContext(StateContext);
    const { chain } = useNetwork();

    const openNetworkModal = () => {
        setOldChainId(chain?.id);
        dispatch({ type: Actions.SetIsNetworkModalVisible, payload: true });
    };

    useEffect(() => {
        if (isNetworkModalVisible && chain?.id !== oldChainId) {
            setOldChainId(chain?.id);
            dispatch({ type: Actions.SetIsNetworkModalVisible, payload: false });
        }
    }, [isNetworkModalVisible, chain, oldChainId, dispatch]);

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
                {chain && <NetworkChanger onClick={openNetworkModal} />}
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
