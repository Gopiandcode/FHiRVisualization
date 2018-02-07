import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { Router, browserHistory  } from "react-router";
import { syncHistoryWithStore, syncHistory } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import isNode from "detect-node";
import createRoutes from "./routes";
import rootReducer from "./reducers";
import './index.scss';
// import App from 'components/App';

// if(module.hot) {
//     module.hot.accept();
// }

// render(<App />, document.getElementById('app'));

let middleware = [thunkMiddleware];

// Don't use Logger Server side
if(!isNode) {
    middleware.push(createLogger());
}

const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(rootReducer);

const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store, history);

render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById("app")
);