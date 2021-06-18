import React, { useState } from "react";
import Country from "./components/country";
import Home from "./components/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";

const App = () => {
	const [isDarkModeActive, setIsDarkModeActive] = useState(false);

	const themeSwitch = mode => setIsDarkModeActive(mode === "dark");

	return (
		<Router>
			<div className={isDarkModeActive ? "dark" : "light"}>
				<Header themeSwitch={themeSwitch} isDarkModeActive={isDarkModeActive} />
				<Switch>
					<Route
						path="/"
						exact
						render={props => (
							<Home {...props} isDarkModeActive={isDarkModeActive} />
						)}
					/>
					<Route
						path="/country/:code"
						exact
						render={props => (
							<Country {...props} isDarkModeActive={isDarkModeActive} />
						)}
					/>
				</Switch>
			</div>
		</Router>
	);
};
export default App;
