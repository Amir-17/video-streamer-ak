import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { fetchStream, deleteStream } from "../actions";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

function StreamDelete(props) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const stream = useSelector((state) => state.stream);

	const { id } = useParams();

	useEffect(() => {
		props.fetchStream(id);
		setLoading(false);
	}, []);

	const onCancel = () => {
		navigate("/");
	};

	const onDelete = () => {
		props.deleteStream(id);
		navigate("/");
	};

	const renderContent = () => {
		return `Are you sure you want to delete this stream: ${stream.title}`;
	};

	if (loading) {
		return "Loading";
	}

	return (
		<>
			<Modal
				title="Delete Stream"
				description={renderContent()}
				onCancel={onCancel}
				onDelete={onDelete}
			/>
		</>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.id],
	};
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
	StreamDelete
);
