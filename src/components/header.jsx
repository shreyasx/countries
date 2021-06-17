import React from "react";
import "../styles/header.css";

const Header = () => {
	return (
		<>
			<div id="header">
				<h3>Where in the world?</h3>
				<div>
					<img src="/images/moon.svg" alt="moon" id="theme-switcher" />
					&nbsp;&nbsp;Dark Mode
				</div>
			</div>
		</>
	);
};

export default Header;
