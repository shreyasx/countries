import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import "../styles/country.css";

const API = "https://restcountries.eu/rest/v2/alpha/";

const Country = ({ match, history, isDarkModeActive }) => {
	const [country, setCountry] = useState({});
	const [loading, setLoading] = useState(true);
	const [borders, setBorders] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(API + match.params.code);
			const data = await response.json();
			setCountry(data);
		})();
	}, [match.params.code]);

	useEffect(() => {
		(async () => {
			if (!("borders" in country)) return;
			var borders = [];
			for (var i = 0; i < country.borders.length; i++) {
				const response = await fetch(API + country.borders[i]);
				const data = await response.json();
				const { name, alpha3Code } = data;
				borders.push({ name, alpha3Code });
			}
			setBorders(borders);
			setLoading(false);
		})();
	}, [country]);

	const getList = array => {
		var line = "";
		for (var i = 0; i < array.length; i++) {
			line += array[i];
			if (i !== array.length - 1) line += ", ";
		}
		return line;
	};

	const {
		name,
		flag,
		nativeName,
		population,
		region,
		subregion,
		capital,
		topLevelDomain,
		currencies,
		languages,
	} = country;

	return (
		<div
			className={isDarkModeActive ? "dark country" : "light country"}
			style={{ minHeight: "calc(100vh - 75px)" }}
		>
			{loading ? (
				<div style={{ padding: "50px" }}>
					<ReactLoading
						type={"spinningBubbles"}
						color={isDarkModeActive ? "#fff" : "#000"}
						height={150}
						width={150}
					/>
				</div>
			) : (
				<>
					<div id="btns">
						<button
							style={{
								color: isDarkModeActive
									? "hsl(0, 0%, 100%)"
									: "hsl(200, 15%, 8%)",
								backgroundColor: isDarkModeActive
									? "hsl(209, 23%, 22%)"
									: "hsl(0, 0%, 100%)",
							}}
							onClick={history.goBack}
							className="back"
						>
							<i
								style={{
									borderColor: isDarkModeActive
										? "hsl(0, 0%, 100%)"
										: "hsl(200, 15%, 8%)",
								}}
								className="arrow left"
							></i>
							&nbsp;&nbsp;&nbsp;Back
						</button>
						<button
							className="back"
							style={{
								cursor: "pointer",
								backgroundColor: isDarkModeActive
									? "hsl(209, 23%, 22%)"
									: "hsl(0, 0%, 100%)",
							}}
						>
							<Link
								style={{
									color: isDarkModeActive
										? "hsl(0, 0%, 100%)"
										: "hsl(200, 15%, 8%)",
								}}
								to="/"
							>
								<img src="/images/home.svg" alt="Home icon" srcset="" />
								&nbsp;&nbsp;&nbsp;Home
							</Link>
						</button>
					</div>
					<div
						className={
							isDarkModeActive
								? "w3-container w3-half dark flag-container"
								: "w3-container w3-half light flag-container"
						}
					>
						<img id={"flag"} src={flag} alt={`${name}'s flag`} />
					</div>
					<div
						className={
							isDarkModeActive
								? "w3-container w3-half dark info-container"
								: "w3-container w3-half light info-container"
						}
					>
						<h2 style={{ margin: "10px 40px" }}>{country.name}</h2>
						<div className="list">
							<ul>
								<li>
									<span className="bold-span">Native Name:</span> {nativeName}
								</li>
								<li>
									<span className="bold-span">Population:</span> {population}
								</li>
								<li>
									<span className="bold-span">Region:</span> {region}
								</li>
								<li>
									<span className="bold-span">Sub Region:</span> {subregion}
								</li>
								<li>
									<span className="bold-span">Capital:</span> {capital}
								</li>
							</ul>
							<ul>
								<li>
									<span className="bold-span">Top Level Domain:</span>{" "}
									{getList(topLevelDomain)}
								</li>
								<li>
									<span className="bold-span">Currencies:</span>{" "}
									{getList(currencies.map(currency => currency.name))}
								</li>
								<li>
									<span className="bold-span">Languages:</span>{" "}
									{getList(languages.map(language => language.name))}
								</li>
							</ul>
						</div>
						<div className="neighbours">
							<span className="bold-span">Border Countries:</span>
							<br />
							{borders.map((country, index) => (
								<Link
									className="neighbour-link"
									key={index}
									to={`/country/${country.alpha3Code}`}
									onClick={() => setLoading(true)}
								>
									<button
										style={{
											backgroundColor: isDarkModeActive
												? "hsl(209, 23%, 22%)"
												: "hsl(0, 0%, 100%)",
											color: isDarkModeActive
												? "hsl(0, 0%, 100%)"
												: "hsl(200, 15%, 8%)",
										}}
										className="neighbour"
									>
										{country.name}
									</button>
								</Link>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Country;

// TODO: Properties to be shown:
// flag,
// nativeName,
// population,
// region,
// subregion,
// capital,
// topLevelDomain,
// currencies,
// languages
