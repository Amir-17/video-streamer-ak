import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = ({ dispatch, isSignedIn }) => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"283618069313-2dn07b57dptcm86qm9035kbhpn5rqgep.apps.googleusercontent.com",
					scope: "email",
					plugin_names: "streamy",
				})
				.then(() => {
					setAuth(window.gapi.auth2.getAuthInstance());
					onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
					window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
				});
		});
	}, []);

	const onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			dispatch(
				signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId())
			);
		} else {
			dispatch(signOut());
		}
	};

	const onSignInClick = () => {
		auth.signIn();
	};

	const onSignOutClick = () => {
		auth.signOut();
	};

	const renderAuthButton = () => {
		if (isSignedIn === null) {
			return null;
		} else if (isSignedIn) {
			return (
				<div>
					<button className="ui google red button" onClick={onSignOutClick}>
						<i className="google icon" />
						Sign Out
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<button className="ui red google button" onClick={onSignInClick}>
						<i className="google icon" />
						Sign In
					</button>
				</div>
			);
		}
	};

	return (
		<Link to="/" className="item">
			<div>{renderAuthButton()}</div>
		</Link>
	);
};

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(GoogleAuth);
