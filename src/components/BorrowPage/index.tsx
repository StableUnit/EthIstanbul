import React, { useState } from "react";
import cn from "classnames";

import { RepaySection } from "./_supportComponents/RepaySection";
import { BorrowSection } from "./_supportComponents/BorrowSection";

import "./styles.scss";

export const BorrowPage = () => {
    const [title, setTitle] = useState("borrow");

    const handleChangeTitle = (v: string) => () => {
        setTitle(v);
    };
    return (
        <div className="borrow">
            <div className="borrow__titles">
                <div
                    className={cn("borrow__title", { "borrow__title--selected": title === "borrow" })}
                    onClick={handleChangeTitle("borrow")}
                >
                    Borrow
                </div>
                <div
                    className={cn("borrow__title", { "borrow__title--selected": title === "repay" })}
                    onClick={handleChangeTitle("repay")}
                >
                    Repay
                </div>
            </div>
            <div className="borrow__content">
                {title === "borrow" && <BorrowSection />}
                {title === "repay" && <RepaySection />}
            </div>
        </div>
    );
};
