import React from "react";
import "../styles/header.css";

const Header = () => {
	return (
		<>
			<div id="header">
				<h3>Where in the world?</h3>
				<div>
					<img src="/images/moon.png" alt="moon" />
					&nbsp;&nbsp;Dark Mode
				</div>
			</div>
		</>
	);
};

export default Header;
