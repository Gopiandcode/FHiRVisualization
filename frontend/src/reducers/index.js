import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import user from 'reducers/user';
import CorporateHome from 'reducers/corporate/home';
import CorporateSettings from 'reducers/corporate/settings';
import CorporateData from 'reducers/corporate/data';

import IndividualHome from 'reducers/individual/home';
import IndividualSettings from 'reducers/individual/settings';
import IndividualData from 'reducers/individual/data';
import IndividualGoals from 'reducers/individual/goals';

export default combineReducers({
    user: user,
    corporate: combineReducers({
        home: CorporateHome,
        settings: CorporateSettings,
        data: CorporateData,
    }),
    individual: combineReducers({
        home: IndividualHome,
        settings: IndividualSettings,
        data: IndividualData,
        goals: IndividualGoals,
    }),

    routing: routerReducer
});