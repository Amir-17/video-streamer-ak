import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import GoogleAuth from "./GoogleAuth";

function Header() {
	return (
		<div
			className="ui secondary pointing menu"
			style={{ borderBottom: "1px solid blue" }}>
			<Link to="/" className="item">
				<h1 className="ui mini">Streamer</h1>
			</Link>
			<div className="right menu">
				<Link to="/" className="item">
					<p style={{ marginBottom: "13%" }}>All Streams</p>
				</Link>
				<GoogleAuth />
			</div>
		</div>
	);
}

export default Header;
