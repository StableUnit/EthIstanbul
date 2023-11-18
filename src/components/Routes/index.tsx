import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { PageNotFound } from "../PageNotFound";
import { BorrowPage } from "../BorrowPage";
import { PoolsPage } from "../PoolsPage";

interface Props {
    onConnect: () => void;
}

export const Routes = ({ onConnect }: Props) => (
    <Switch>
        {/* @ts-ignore */}
        <Route exact path="/borrow">
            <BorrowPage />
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/pools">
            <PoolsPage />
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/">
            <Redirect to="/borrow" />
        </Route>

        <Route path="*">
            <PageNotFound />
        </Route>
    </Switch>
);
