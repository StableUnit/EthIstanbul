import React from "react";
import { Switch, Route } from "react-router-dom";

import { PageNotFound } from "../PageNotFound";

interface Props {
    onConnect: () => void;
}

export const Routes = ({ onConnect }: Props) => (
    <Switch>
        {/* @ts-ignore */}
        <Route exact path="/borrow">
          <div>Borrow and Repay</div>
        </Route>

        {/* @ts-ignore */}
        <Route exact path="/pools">
            <div>Pools</div>
        </Route>

        <Route path="*">
            <PageNotFound />
        </Route>
    </Switch>
);
