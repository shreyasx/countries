import React from "react";
import "../styles/card.css";
import { Link } from "react-router-dom";

const Card = ({ country }) => {
	const { flags, name, population, capital, region, cca2 } = country;
	return (
		<div className="country-card">
			<img className="flag" src={flags.svg} alt={name.official + "'s flag"} />
			<div className="info">
				<h4 className="country-title">
					<Link
						style={{ fontWeight: 800, fontSize: "18px" }}
						to={`/country/${cca2}`}
					>
						{name.common}
					</Link>
				</h4>
				<div className="details">
					Population: {population} <br />
					Region: {region} <br />
					Capital(s): {capital.map(cap => cap + " ")} <br />
				</div>
			</div>
		</div>
	);
};

export default Card;
