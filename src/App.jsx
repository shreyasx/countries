import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Card from "./components/card";
import "./styles/app.css";
const API =
	"https://restcountries.eu/rest/v2/all?fields=name;region;capital;population;flag";
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

const App = () => {
	const [countries, setCountries] = useState([]);

	const getCountries = async () => {
		const response = await fetch(API);
		const countries = await response.json();
		setCountries(shuffleArray(countries));
	};

	useEffect(() => getCountries(), []);
	return (
		<>
			<Header />
			<div className="countries-container">
				{countries.map((country, index) => (
					<Card key={index} country={country} />
				))}
			</div>
		</>
	);
};

export default App;
