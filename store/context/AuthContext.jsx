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
	updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import toastNotify from "./../../utils/toastNotify";
import nookies from "nookies";
import { useSaveUser } from "../../hooks";

const defaultInfos = {
	photoURL:
		"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
};

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

export const AuthProvider = ({ children, currentUserProps, ...rest }) => {
	const { saveUserFunc } = useSaveUser();
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

	// set cookies
	const setCookiesHandler = (token) => {
		nookies.set(undefined, "user_token", token, {
			path: "/",
			sameSite: "strict",
		});
	};

	// auth functions
	const signupFunc = async (username, email, password) => {
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

			await updateProfile(result?.user, {
				displayName: username,
				photoURL: defaultInfos.photoURL,
			});

			await saveUserFunc(result?.user);

			const token = await result.user.getIdToken({ forceRefresh: false });

			// set cookies
			setCookiesHandler(token);

			toastNotify("success", `Hi👋, ${username}`);
			replace("/");
		} catch (error) {
			toastNotify("error", error);
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

			const token = await result.user.getIdToken({ forceRefresh: false });

			// set cookies
			setCookiesHandler(token);

			toastNotify("success", `So long ${result.user?.displayName} 🤗`);
			replace("/");
		} catch (error) {
			toastNotify("error", error);
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

			// delete cookies
			nookies.destroy(undefined, "user_token");

			toastNotify("success", "See you soon 😊");
			replace("/infos");
		} catch (error) {
			toastNotify("error", error);
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

			await saveUserFunc(result.user);

			const token = await result.user.getIdToken({ forceRefresh: false });

			// set cookies
			setCookiesHandler(token);

			toastNotify("success", `So long ${result.user?.displayName} 🤗`);
			replace("/");
		} catch (error) {
			toastNotify("error", error);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				[provider]: false,
			}));
		}
	};

	const values = {
		currentUser: currentUserProps || currentUser,
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
