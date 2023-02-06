import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../lib/firebase.config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	FacebookAuthProvider,
	sendPasswordResetEmail,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import toastNotify from "./../../utils/toastNotify";
import { useGetRedirectURL, useSaveUser } from "../../hooks";
import cookiesHandler from "../../utils/cookiesHandler";

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
		facebook: false,
	},
	signupFunc: async (email, password) => {},
	signinFunc: async (email, password) => {},
	signoutFunc: async () => {},
	signinWithProviderFunc: async (provider) => {},
	resetPasswordFunc: async (email) => {},
};

const timer = 1800000; //30 min

// just for offline test
const mockUser = {
	uid: "AIzaSyCvBxFKQ",
	email: "johndoe@gmail.com",
	displayName: "John Doe",
	photoURL: "../../public/assets/defaultPhotoURL.png",
	joinedOn: new Date().toISOString(),
};

const Context = createContext(initState);

export const AuthProvider = ({ children, currentUserProps, ...rest }) => {
	const { saveUserFunc } = useSaveUser();
	const { getRedirectURLFunc } = useGetRedirectURL();
	const [currentUser, setCurrentUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(initState.authLoading);
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();
	const facebookProvider = new FacebookAuthProvider();
	const { replace } = useRouter();

	// provider config
	googleProvider.setCustomParameters({
		prompt: "select_account",
	});

	githubProvider.setCustomParameters({
		prompt: "select_account",
	});

	facebookProvider.setCustomParameters({
		prompt: "select_account",
	});

	// listen for user state
	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				setCurrentUser(user);
			}),
		[]
	);

	// set new user token if the old one has expired
	useEffect(() => {
		const setNewToken = async () => {
			const newToken = await auth?.currentUser.getIdToken(true);
			await cookiesHandler("set", newToken);
		};

		const timiID = setInterval(
			() => auth?.currentUser && setNewToken(),
			timer
		);

		return () => {
			return clearInterval(timiID);
		};
	}, []);

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
			await cookiesHandler("set", token);

			toastNotify("success", `Hi👋, ${username}`);

			// redirect
			replace(getRedirectURLFunc("/"));
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
			await cookiesHandler("set", token);

			toastNotify("success", `So long ${result.user?.displayName} 🤗`);

			// redirect
			replace(getRedirectURLFunc("/"));
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
			await cookiesHandler("destroy");

			toastNotify("success", "See you soon 😊");

			// redirect
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
				provider === "google" ? googleProvider : githubProvider //githubProvider
			);

			await saveUserFunc(result.user);

			const token = await result.user.getIdToken({ forceRefresh: false });

			// set cookies
			await cookiesHandler("set", token);

			toastNotify("success", `So long ${result.user?.displayName} 🤗`);

			// redirect
			replace(getRedirectURLFunc("/"));
		} catch (error) {
			toastNotify("error", error);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				[provider]: false,
			}));
		}
	};

	const resetPasswordFunc = async (email) => {
		try {
			const actionCodeSettings = {
				// After password reset, the user will be give the ability to go back
				// to this page.
				url: `${
					process.env.NODE_ENV === "production"
						? "https://rohy.vercel.app"
						: "http://localhost:3000"
				}/?email=${email}`,
				handleCodeInApp: false,
			};
			await sendPasswordResetEmail(auth, email, actionCodeSettings);

			toastNotify("success", "Password reset email sent");
		} catch (error) {
			toastNotify("error", error);
		}
	};

	const values = {
		currentUser: process.env.NODE_ENV === "production" ? (currentUserProps || currentUser) : (currentUserProps || currentUser || mockUser),
		authLoading,
		signupFunc,
		signinFunc,
		signoutFunc,
		signinWithProviderFunc,
		resetPasswordFunc,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const AuthContext = () => {
	return useContext(Context);
};
