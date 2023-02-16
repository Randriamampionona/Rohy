import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";
import { RESET_ERROR, TOOGLE_ADMIN_SIDEBAR } from "../actions/actions";
import globalReducer from "../reducers/globalReducer";

const initState = {
	error: null,
	isAdminSidebarOpen: true,
	resetError: () => {},
	toogleAdminSidebar: (key) => {},
};

const Context = createContext(initState);

export const GlobalProvider = ({ children, errorProps }) => {
	const [state, dispatch] = useReducer(globalReducer, initState);
	const { pathname } = useRouter();

	// style
	useEffect(() => {
		const addAttr = () => document.body.setAttribute("id", "_dashboard");
		const removeAttr = () => document.body.removeAttribute("id");

		if (window && pathname.startsWith("/admin/dashboard")) {
			return addAttr();
		} else {
			return removeAttr();
		}
	}, [pathname]);

	const resetError = () => {
		dispatch({
			type: RESET_ERROR,
		});
	};

	const toogleAdminSidebar = (key) => {
		dispatch({
			type: TOOGLE_ADMIN_SIDEBAR,
			payload: key,
		});
	};

	const values = {
		error: errorProps || state.error,
		isAdminSidebarOpen: state.isAdminSidebarOpen,
		resetError,
		toogleAdminSidebar,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const GlobalContext = () => {
	return useContext(Context);
};

// {
// 	status: 404,
// 	statusText: "Not Found",
//  rdc: "/",
// 	data: {
// 		error: true,
// 		message: "Not Found",
// 	},
// },
