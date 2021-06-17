import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ReactLoading from "react-loading";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/index.css";
const App = lazy(() => import("./App"));

ReactDOM.render(
	<Suspense
		fallback={
			<div style={{ padding: "50px" }}>
				<ReactLoading
					type={"spinningBubbles"}
					color={"#000000"}
					height={150}
					width={150}
				/>
			</div>
		}
	>
		<App />
	</Suspense>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
