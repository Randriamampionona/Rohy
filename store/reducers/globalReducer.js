import { ACCEPT_COOKIES, TOOGLE_ADMIN_SIDEBAR } from "../actions/actions";

const globalReducer = (state, action) => {
	switch (action.type) {
		case TOOGLE_ADMIN_SIDEBAR:
			return {
				...state,
				isAdminSidebarOpen:
					action?.payload || !state.isAdminSidebarOpen,
			};

		case ACCEPT_COOKIES:
			return {
				...state,
				cookies: action?.payload,
			};

		default:
			return state;
	}
};

export default globalReducer;
