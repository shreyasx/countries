import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import "../styles/country.css";

const Country = ({ match }) => {
	const [country, setCountry] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const response = await fetch(
				"https://restcountries.eu/rest/v2/alpha/" + match.params.code
			);
			const data = await response.json();
			setCountry(data);
			setLoading(false);
		})();
	}, [match.params.code]);

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
		<div className="country">
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
				<>
					<Link className="link-to-home" to="/">
						<button id="back">
							<i className="arrow left"></i>&nbsp;&nbsp;&nbsp;Back
						</button>
					</Link>
					<div className="w3-container w3-half flag-container">
						<img id={"flag"} src={flag} alt={`${name}'s flag`} />
					</div>
					<div className="w3-container w3-half info-container">
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
