import React from "react";
import "../styles/card.css";
import { Link } from "react-router-dom";

const Card = ({ country }) => {
	const { flag, name, population, capital, region, alpha3Code } = country;
	return (
		<div className="country-card">
			<img className="flag" src={flag} alt={name + "'s flag"} />
			<div className="info">
				<h4 className="country-title">
					<Link
						style={{ fontWeight: 800, fontSize: "18px" }}
						to={`/country/${alpha3Code}`}
					>
						{name}
					</Link>
				</h4>
				<div className="details">
					Population: {population} <br />
					Region: {region} <br />
					Capital: {capital} <br />
				</div>
			</div>
		</div>
	);
};

export default Card;
