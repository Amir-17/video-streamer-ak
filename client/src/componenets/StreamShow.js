import React, { useEffect } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../actions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const StreamShow = (props) => {
	const date = new Date();
	let TimeAndDate =
		date.getDay() +
		"/" +
		date.getMonth() +
		"/" +
		date.getFullYear() +
		"/" +
		date.getHours() +
		":" +
		date.getMinutes();

	const stream = useSelector((state) => state.stream);
	const videoRef = React.createRef();
	const { id } = useParams();

	useEffect(() => {
		props.fetchStream(id);
		player();
	}, []);

	const player = () => {
		let player;
		player = flv.createPlayer({
			type: "flv",
			url: `http://localhost:8000/live/${id}.flv`,
		});
		player.attachMediaElement(videoRef.current);
		player.load();
	};

	return (
		<div>
			<video
				ref={videoRef}
				style={{ width: "100%", height: "400px" }}
				controls={true}
			/>
			<h1 style={{ borderBottom: "1px solid red" }}>
				Informations about stream
			</h1>
			<h4>
				{""}
				Title: <span style={{ color: "red" }}>{stream.title}</span>
			</h4>
			<h5>
				{" "}
				Description: <span style={{ color: "red" }}>{stream.description}</span>
			</h5>
			<h5>
				Time&Date: <span style={{ color: "red" }}>{TimeAndDate}</span>
			</h5>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.id],
	};
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
