import React, { useEffect, useState } from "react";
import Filters from "./filters";
import ReactLoading from "react-loading";
import Card from "./card";
import "../styles/home.css";

const API =
	"https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags,cca2";

const shuffleArray = array => {
	var currentIndex = array.length,
		randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
	return array;
};

const Home = ({ isDarkModeActive }) => {
	const [countries, setCountries] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [regions, setRegions] = useState([]);
	const [region, setRegion] = useState("All");
	const [loading, setLoading] = useState(true);

	const getCountries = async () => {
		const response = await fetch(API);
		const data = await response.json();
		setCountries(shuffleArray(data));
		setLoading(false);
	};

	const onRegionChange = text => setRegion(text);
	const onSearchChange = text => setSearchText(text);

	// eslint-disable-next-line
	useEffect(() => getCountries(), []);

	useEffect(() => {
		setRegions(
			countries
				.map(country => country.region)
				.filter((value, index, self) => self.indexOf(value) === index)
		);
	}, [countries]);

	return (
		<div id="home">
			<Filters
				isDarkModeActive={isDarkModeActive}
				onSearchChange={onSearchChange}
				regions={regions}
				onRegionChange={onRegionChange}
			/>
			<div className="countries-container">
				{loading ? (
					<div style={{ padding: "50px" }}>
						<ReactLoading
							type={"spinningBubbles"}
							color={"#000000"}
							height={150}
							width={150}
						/>
					</div>
				) : (
					countries
						.filter(country =>
							country.name.official
								.toLowerCase()
								.includes(searchText.toLowerCase())
						)
						.filter(country =>
							region === "All" ? true : country.region === region
						)
						.map((country, index) => <Card key={index} country={country} />)
				)}
			</div>
		</div>
	);
};

export default Home;
