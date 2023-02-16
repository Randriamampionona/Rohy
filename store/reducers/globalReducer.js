import { RESET_ERROR, TOOGLE_ADMIN_SIDEBAR } from "../actions/actions";

const globalReducer = (state, action) => {
	switch (action.type) {
		case RESET_ERROR:
			return {
				...state,
				error: null,
			};

		case TOOGLE_ADMIN_SIDEBAR:
			return {
				...state,
				isAdminSidebarOpen:
					action?.payload || !state.isAdminSidebarOpen,
			};

		default:
			return state;
	}
};

export default globalReducer;
