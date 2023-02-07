import React from "react";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import ReactDOM from "react-dom/client";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(reduxThunk))
);

const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
	<Provider store={store}>
		<App />{" "}
	</Provider>
);
