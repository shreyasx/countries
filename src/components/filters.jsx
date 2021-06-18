import React, { useEffect, useState } from "react";
import "../styles/filters.css";

const Filters = ({
	onSearchChange,
	regions,
	onRegionChange,
	isDarkModeActive,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const regionChange = region => {
		onRegionChange(region === "No region" ? "" : region);
		const text = document.getElementById("textt");
		region === "All"
			? (text.innerHTML = `Filter by Region`)
			: (text.innerHTML = `Region: ${region}`);
	};

	regions.push("All");
	regions = regions
		.map(region => (region === "" ? "No region" : region))
		.filter((value, index, self) => self.indexOf(value) === index);

	// eslint-disable-next-line
	useEffect(() => regionChange("All"), []);

	return (
		<div id="filters">
			<div
				className={"searchBox"}
				style={{
					backgroundColor: isDarkModeActive
						? "hsl(209, 23%, 22%)"
						: "hsl(0, 0%, 100%)",
				}}
			>
				<img src="/images/search.svg" alt="moon" id="searchIcon" />
				<input
					type="text"
					style={{
						backgroundColor: isDarkModeActive
							? "hsl(209, 23%, 22%)"
							: "hsl(0, 0%, 100%)",
					}}
					placeholder="Search for a country"
					id="searchBox"
					onChange={event => onSearchChange(event.target.value)}
				/>
			</div>
			<div
				style={{
					backgroundColor: isDarkModeActive
						? "hsl(209, 23%, 22%)"
						: "hsl(0, 0%, 100%)",
				}}
				onClick={toggleDropdown}
				className={"dropdown"}
			>
				<span id="textt"></span>
				<i className="arrow down"></i>
				{dropdownOpen && (
					<div
						className={
							isDarkModeActive
								? "dropdownMenu dark light-border"
								: "dropdownMenu light dark-border"
						}
					>
						{regions.map((region, index) => (
							<p
								className="dropdownItem"
								key={index}
								onClick={() => regionChange(region)}
							>
								{region}
							</p>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Filters;
