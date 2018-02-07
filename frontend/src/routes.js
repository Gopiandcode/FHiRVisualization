import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import App from "components/container/App";
import IndividualHomeContainer from "components/container/individual/HomeContainer";
import CorporateHomeContainer from "components/container/corporate/HomeContainer";
import HomeContainer from "components/container/HomeContainer";
import Default from "components/pure/Default";

import CorporateLoginContainer from "components/container/corporate/LoginContainer";
import CorporateRegisterContainer from "components/container/corporate/RegisterContainer";
import CorporateSettingsContainer from "components/container/corporate/SettingsContainer";
import CorporateDataContainer from "components/container/corporate/DataContainer";
import IndividualLoginContainer from "components/container/individual/LoginContainer";
import IndividualRegisterContainer from "components/container/individual/RegisterContainer";
import IndividualSettingsContainer from "components/container/individual/SettingsContainer";
import IndividualGoalsContainer from "components/container/individual/GoalsContainer";
import IndividualDataContainer from "components/container/individual/DataContainer";

import * as corporateStatus from "constants/corporateStatus";

export default function createRoutes(store, history) {
    const requireCorporate = (nextState, replace) => {
        const {user} = store.getState();
        if (user.corporateStatus !== corporateStatus.CORPORATE) {
            // if they are logged in, send them to their correct home
            if (user.corporateStatus === corporateStatus.INDIVIDUAL) {
                replace({
                    pathname: "/individual/home",
                    state: {nextPathname: ""}
                });

            } else {
                // else ask them to log in
                replace({
                    pathname: "/corporate/login",
                    state: {nextPathname: nextState.location.pathname}
                });
            }
        }
    };

    const requireIndividual = (nextState, replace) => {
        const {user} = store.getState();
        if (user.corporateStatus !== corporateStatus.INDIVIDUAL) {
            // if they are logged in, send them to their correct home
            if (user.corporateStatus === corporateStatus.CORPORATE) {
                replace({
                    pathname: "/corporate/home",
                    state: {nextPathname: ""}
                });

            } else {
                // else ask them to log in
                replace({
                    pathname: "/individual/login",
                    state: {nextPathname: nextState.location.pathname}
                });
            }
        }
    };

    const requireUnauthenticated = (nextState, replace) => {
        const {user} = store.getState();
        if (user.corporateStatus !== corporateStatus.UNKNOWN) {
            // if they are logged in,
            // if they are corporate users
            if (user.corporateStatus === corporateStatus.CORPORATE) {
                replace({
                    pathname: "/corporate/home",
                    state: {nextPathname: ""}
                });

                // if they are individual users
            } else if (user.corporateStatus === corporateStatus.INDIVIDUAL) {
                replace({
                    pathname: "/individual/home",
                    state: {nextPathname: ""}
                });
            }
        }

     };


    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Default}/>
                    <Route path="/corporate/login" component={CorporateLoginContainer} onEnter={requireUnauthenticated}/>
                    <Route path="/corporate/register" component={CorporateRegisterContainer} onEnter={requireUnauthenticated}/>
                <Route path="/corporate/home" component={CorporateHomeContainer} onEnter={requireCorporate}/>
                <Route path="/corporate/data" component={CorporateDataContainer} onEnter={requireCorporate}/>
                <Route path="/corporate/settings" component={CorporateSettingsContainer} onEnter={requireCorporate}/>
                    <Route path="/individual/login" component={IndividualLoginContainer} onEnter={requireUnauthenticated}/>
                    <Route path="/individual/register" component={IndividualRegisterContainer} onEnter={requireUnauthenticated}/>
                <Route path="/individual/home" component={IndividualHomeContainer} onEnter={requireIndividual}/>
                <Route path="/individual/data" component={IndividualDataContainer} onEnter={requireIndividual}/>
                <Route path="/individual/goals" component={IndividualGoalsContainer} onEnter={requireIndividual}/>
                <Route path="/individual/settings" component={IndividualSettingsContainer} onEnter={requireIndividual}/>
            </Route>
        </Router>
    )
}