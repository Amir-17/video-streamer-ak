import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editStream, fetchStream } from "../actions";
import StreamForm from "./StreamForm";
import { useSelector } from "react-redux";

function StreamEdit(props) {
	const [loading, setLoading] = useState(true);

	const stream = useSelector((state) => state.stream);

	const { id } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchStream(id));
		setLoading(false);
	}, [dispatch, id]);

	const onSubmit = (formValues) => {
		dispatch(editStream(stream.id, formValues));
	};

	if (loading) {
		return "Loading";
	}

	return (
		<div>
			<h3>Edit Stream</h3>
			{Number(stream.id) === Number(id) && (
				<StreamForm
					onSubmit={onSubmit}
					initialValues={{
						title: stream.title,
						description: stream.description,
					}}
				/>
			)}{" "}
			{""}
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.id],
	};
};

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
