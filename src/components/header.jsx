import React from "react";
import "../styles/header.css";

const Header = ({ themeSwitch, isDarkModeActive }) => {
	return (
		<>
			<div
				id="header"
				style={{
					backgroundColor: isDarkModeActive
						? "hsl(209, 23%, 22%)"
						: "hsl(0, 0%, 100%)",
				}}
			>
				<h3>Where in the world?</h3>
				<div
					onClick={() => themeSwitch(isDarkModeActive ? "light" : "dark")}
					className="theme-switch"
				>
					<img src="/images/moon.svg" alt="moon" id="theme-switcher" />
					&nbsp;&nbsp;Dark Mode
				</div>
			</div>
		</>
	);
};

export default Header;
