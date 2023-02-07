import React from "react";
import { Field, hasSubmitSucceeded, reduxForm } from "redux-form";
import { createStream } from "../actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const StreamDiv = ({ input, label, meta }) => {
	return (
		<div className="field">
			<label>{label}</label>
			<input {...input} />
			{renderError(meta)}
		</div>
	);
};

const renderError = ({ error, touched }) => {
	if (touched && error) {
		return <div className="ui pointing label">{error}</div>;
	}
};

function StreamFormHandler(props) {
	const navigate = useNavigate();
	const onSubmit = (formValues) => {
		props.onSubmit(formValues);
		navigate("/");
	};

	if (hasSubmitSucceeded === true) {
		return navigate("/");
	}

	return (
		<form className="ui form" onSubmit={props.handleSubmit(onSubmit)}>
			<Field
				type="text"
				name="title"
				label="Enter Title: "
				component={StreamDiv}
			/>
			<Field
				type="text"
				name="description"
				label="Enter Description: "
				component={StreamDiv}
			/>
			<button className="ui button primary" type="submit">
				Submit
			</button>
		</form>
	);
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = "You must enter a title";
	}

	if (!formValues.description) {
		errors.description = "You must enter a description";
	}

	return errors;
};

const formWrapped = reduxForm({
	form: "streamForm",
	validate: validate,
})(StreamFormHandler);

export default connect(null, { createStream })(formWrapped);
