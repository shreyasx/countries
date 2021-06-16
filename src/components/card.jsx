import React from "react";
import "../styles/card.css";

const Card = ({ country }) => {
	const { flag, name, population, capital, region } = country;
	return (
		<div className="country-card">
			<img className="flag" src={flag} alt={name + "'s flag"} />
			<div className="info">
				<h4>{name}</h4>
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
