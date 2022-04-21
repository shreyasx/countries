import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import "../styles/country.css";

const Country = ({ match, history, isDarkModeActive }) => {
	const [country, setCountry] = useState(null);
	const [loading, setLoading] = useState(true);
	const [borders, setBorders] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setBorders([]);
				const response = await fetch(
					`https://restcountries.com/v3.1/alpha/${match.params.code}`
				);
				const data = await response.json();
				setCountry(data[0]);
				console.log(data[0]);
				setLoading(false);
			} catch (e) {
				history.goBack();
			}
		})();
	}, [match.params.code, history]);

	useEffect(() => {
		(async () => {
			if (country !== null) {
				if (!("borders" in country)) {
					setLoading(false);
					return;
				}
				var borders = [];
				for (var i = 0; i < country.borders.length; i++) {
					const response = await fetch(
						`https://restcountries.com/v3.1/alpha/${country.borders[i]}?fields=name,cca2`
					);
					const data = await response.json();
					console.log(data);
					const { name, cca2 } = data;
					borders.push({ name: name.common, cca2 });
				}
				setBorders(borders);
			}
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
				"name" in country && (
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
							<img
								id={"flag"}
								src={country.flags.svg}
								alt={`${country.name.common}'s flag`}
							/>
						</div>
						<div
							className={
								isDarkModeActive
									? "w3-container w3-half dark info-container"
									: "w3-container w3-half light info-container"
							}
						>
							<h2 style={{ margin: "10px 40px" }}>{country.name.common}</h2>
							<div className="list">
								<ul>
									<li>
										<span className="bold-span">Official Name:</span>{" "}
										{country.name.official}
									</li>
									<li>
										<span className="bold-span">Population:</span>{" "}
										{country.population}
									</li>
									<li>
										<span className="bold-span">Region:</span> {country.region}
									</li>
									<li>
										<span className="bold-span">Sub Region:</span>{" "}
										{country.subregion}
									</li>
									<li>
										<span className="bold-span">Capital:</span>{" "}
										{getList(country.capital)}
									</li>
								</ul>
								<ul>
									<li>
										<span className="bold-span">Alternate Spellings</span>{" "}
										{getList(country.altSpellings)}
									</li>
									<li>
										<span className="bold-span">Timezones:</span>{" "}
										{getList(country.timezones)}
									</li>
									{/* <li>
										<span className="bold-span">Languages:</span>{" "}
										{getList(country.languages.map(language => language.name))}
									</li> */}
								</ul>
							</div>
							<div className="neighbours">
								<span className="bold-span">Border Countries:</span>
								<br />
								{borders.length === 0 ? (
									<div>loading...</div>
								) : (
									borders.map((country, index) => (
										<Link
											className="neighbour-link"
											key={index}
											to={`/country/${country.cca2}`}
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
									))
								)}
							</div>
						</div>
					</>
				)
			)}
		</div>
	);
};

export default Country;
