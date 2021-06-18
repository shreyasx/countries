import React, { useEffect, useState } from "react";
import Country from "./components/country";
import Home from "./components/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header";
import { useBeforeunload } from "react-beforeunload";

const App = () => {
	const [isDarkModeActive, setIsDarkModeActive] = useState(false);
	const themeSwitch = mode => setIsDarkModeActive(mode === "dark");

	const checkStorage = () => {
		var storedValue;
		if ((storedValue = JSON.parse(localStorage.getItem("isDarkModeActive"))))
			setIsDarkModeActive(storedValue);
	};

	useBeforeunload(() =>
		localStorage.setItem("isDarkModeActive", isDarkModeActive)
	);

	useEffect(checkStorage, []);

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
