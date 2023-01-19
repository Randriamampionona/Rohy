import { RESET_ERROR } from "../actions/actions";

const globalReducer = (state, action) => {
	switch (action.type) {
		case RESET_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export default globalReducer;
