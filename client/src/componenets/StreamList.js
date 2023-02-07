import React, { useEffect } from "react";
import { fetchStreams } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function StreamList({ fetchStreams, streams, currentUserId, isSignedIn }) {
	useEffect(() => {
		fetchStreams();
	}, []);

	const renderAdmin = (stream) => {
		if (streams.userId === currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<Link
						to={`/streams/delete/${stream.id}`}
						className="ui button negative">
						Delete
					</Link>
				</div>
			);
		}
	};

	const renderCreate = () => {
		if (isSignedIn) {
			return (
				<div style={{ float: "right" }}>
					<Link to="/streams/new">
						<button className="ui button primary">Create Stream</button>
					</Link>
				</div>
			);
		}
	};

	const renderList = () => {
		return streams.map((stream) => {
			return (
				<div
					className="item"
					key={stream.id}
					style={{ borderBottom: "1px solid blue" }}>
					{renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link className="header" to={`/streams/${stream.id}`}>
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	};
	return (
		<div>
			<h2>All streams</h2>
			<div className="ui celled list">{renderList()}</div>
			{renderCreate()}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
