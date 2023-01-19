import { createContext, useContext, useReducer } from "react";
import { RESET_ERROR } from "../actions/actions";
import globalReducer from "../reducers/globalReducer";

const initState = {
	error: null,
	resetError: () => {},
};

const Context = createContext(initState);

export const GlobalProvider = ({ children, errorProps }) => {
	const [state, dispatch] = useReducer(globalReducer, initState);

	const resetError = () => {
		dispatch({
			type: RESET_ERROR,
		});
	};

	const values = {
		error: errorProps || state.error,
		resetError,
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
