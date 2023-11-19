import React from "react";
import cn from "classnames";

import "./styles.scss";

interface ButtonProps {
    className?: string;
    padding?: string;
    text?: string;
    disabled?: boolean;
    onClick?: () => void;
    width?: number;
    children?: React.ReactNode;
    id?: string;
}

export const ButtonGray = ({
    id,
    onClick,
    padding,
    text,
    className,
    disabled,
    children,
    width,
    ...props
}: ButtonProps) => {
    return (
        <div
            id={id}
            className={cn("button-gray", className, { "button-gray--disabled": disabled })}
            onClick={disabled ? undefined : onClick}
            style={{ padding, width }}
            {...props}
        >
            {children ?? text}
        </div>
    );
};
