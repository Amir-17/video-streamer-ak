import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

const Modal = (props) => {
	return ReactDOM.createPortal(
		<div className="ui dimmer modals visible active" onClick={props.onCancle}>
			<div
				className="ui standard modal visible active"
				onClick={(e) => e.stopPropagation()}>
				<div className="header">{props.title}</div>
				<div className="content" style={{ borderBottom: "1px solid blue" }}>
					{props.description}
				</div>
				<div className="actions">
					<button className="ui negative button" onClick={props.onDelete}>
						Delete
					</button>
					<Link to="/" className="ui button" onClick={props.onCancel}>
						Cancel
					</Link>
				</div>
			</div>
		</div>,
		document.querySelector("#modal")
	);
};
export default Modal;
