import { createContext, useContext, useState } from "react";

const initState = {
	error: null,
};

const Context = createContext(initState);

export const GlobalProvider = ({ children, errorProps }) => {
	const [error, _setError] = useState(initState.error);

	const values = {
		error: errorProps || error,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const GlobalContext = () => {
	return useContext(Context);
};

// {
// 	status: 404,
// 	statusText: "Not Found",
// 	data: {
// 		error: true,
// 		message: "Not Found",
// 		rdc: "/",
// 	},
// },
