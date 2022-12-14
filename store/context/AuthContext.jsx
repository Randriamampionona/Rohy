import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../lib/firebase.config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import toastNotify from "./../../utils/toastNotify";
import nookies from "nookies";

const initState = {
	currentUser: null,
	authLoading: {
		signin: false,
		signup: false,
		signout: false,
		google: false,
		github: false,
	},
	signupFunc: async (email, password) => {},
	signinFunc: async (email, password) => {},
	signoutFunc: async () => {},
	signinWithProviderFunc: async (provider) => {},
};

const Context = createContext(initState);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(initState.authLoading);
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();
	const { replace } = useRouter();

	// listen for user state
	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				setCurrentUser(user);
			}),
		[]
	);

	// auth functions
	const signupFunc = async (email, password) => {
		setAuthLoading((prev) => ({
			...prev,
			signup: true,
		}));

		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const token = await result.user.getIdToken({ forceRefresh: true });

			nookies.set(undefined, "token", token, {
				path: "/",
				maxAge: 60 * 60 * 60 * 3,
			});

			replace("/");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				signup: false,
			}));
		}
	};

	const signinFunc = async (email, password) => {
		setAuthLoading((prev) => ({
			...prev,
			signin: true,
		}));

		try {
			const result = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const token = await result.user.getIdToken({ forceRefresh: true });

			nookies.set(undefined, "token", token, {
				path: "/",
				maxAge: 60 * 60 * 60 * 3,
			});

			toastNotify("success", `So long ${result.user?.displayName}`);
			replace("/");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				signin: false,
			}));
		}
	};

	const signoutFunc = async () => {
		setAuthLoading((prev) => ({
			...prev,
			signout: true,
		}));

		try {
			await signOut(auth);
			nookies.destroy(null, "token");
			toastNotify("success", "See you soon");
			replace("/infos");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				signout: false,
			}));
		}
	};

	const signinWithProviderFunc = async (provider) => {
		setAuthLoading((prev) => ({
			...prev,
			[provider]: true,
		}));

		try {
			const result = await signInWithPopup(
				auth,
				provider === "google" ? googleProvider : githubProvider
			);

			const token = await result.user.getIdToken({ forceRefresh: true });

			nookies.set(undefined, "token", token, {
				path: "/",
				maxAge: 60 * 60 * 60 * 3,
			});

			toastNotify("success", `So long ${result.user?.displayName}`);
			replace("/");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				[provider]: false,
			}));
		}
	};

	const values = {
		currentUser,
		authLoading,
		signupFunc,
		signinFunc,
		signoutFunc,
		signinWithProviderFunc,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const AuthContext = () => {
	return useContext(Context);
};
