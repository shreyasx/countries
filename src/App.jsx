import React from "react";
import Country from "./components/country";
import Home from "./components/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";

const App = () => (
	<Router>
		<Header />
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/country/:code" exact component={Country} />
		</Switch>
	</Router>
);
export default App;
