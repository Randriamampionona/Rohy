import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";
import { TOOGLE_ADMIN_SIDEBAR, ACCEPT_COOKIES } from "../actions/actions";
import globalReducer from "../reducers/globalReducer";
import { parseCookies } from "nookies";

const initState = {
	cookies: { accepted: false },
	isAdminSidebarOpen: true,
	toogleAdminSidebar: (key) => {},
	acceptCookies: (data) => {},
};

const initializer = () => {
	// Get the cookie value
	const cookies = parseCookies();
	const cookieValue = cookies[process.env.NEXT_PUBLIC_ROHY_COOKIES_NAME];

	return {
		...initState,
		cookies: cookieValue
			? { accepted: !!JSON.parse(cookieValue)?.accepted }
			: { accepted: false },
	};
};

const Context = createContext(initState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, initState, initializer);
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

	const toogleAdminSidebar = (key) => {
		dispatch({
			type: TOOGLE_ADMIN_SIDEBAR,
			payload: key,
		});
	};

	const acceptCookies = (data) => {
		dispatch({
			type: ACCEPT_COOKIES,
			payload: data,
		});
	};

	const values = {
		cookies: state.cookies,
		isAdminSidebarOpen: state.isAdminSidebarOpen,
		toogleAdminSidebar,
		acceptCookies,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const GlobalContext = () => {
	return useContext(Context);
};
