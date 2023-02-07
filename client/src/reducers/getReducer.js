import { FETCH_STREAM } from "../actions/types";

const getStreamReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAM:
			return action.payload;
		default:
			return state;
	}
};

export default getStreamReducer;
