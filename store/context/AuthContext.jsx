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
	sendEmailVerification,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase.config";
import { useRouter } from "next/router";
import toastNotify from "./../../utils/toastNotify";
import { useGetRedirectURL, useSaveUser } from "../../hooks";
import cookiesHandler from "../../utils/cookiesHandler";
import { doc, getDoc } from "firebase/firestore";

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
		sendEmailLink: false,
		resetPassword: false,
	},
	signupFunc: async (email, password) => {},
	signinFunc: async (email, password) => {},
	signoutFunc: async () => {},
	signinWithProviderFunc: async (provider) => {},
	resetPasswordFunc: async (email) => {},
	sendEmailVerificationFunc: async () => {},
};

const timer = 1000 * 60 * 30;

const Context = createContext(initState);

export const AuthProvider = ({ children, currentUserProps }) => {
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
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setCurrentUser(null);
				return;
			} else {
				const docRef = doc(db, "users", user?.uid);
				const snapshot = await getDoc(docRef);

				setCurrentUser({
					...user,
					role: snapshot.data()?.role?.name || "user",
					joinedOn:
						snapshot.data()?.joinedOn?.toDate()?.toString() || "",
				});
				return;
			}
		});

		return () => {
			return unsubscribe();
		};
	}, []);

	// set new user token every given time
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

			const token = await result.user.getIdToken(false);

			// set cookies
			await cookiesHandler("set", token);

			toastNotify("success", `Hi👋, ${username}`);

			// redirect to verify email
			replace(getRedirectURLFunc("/email-verification"));
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

			const token = await result.user.getIdToken(false);

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

			const token = await result.user.getIdToken(false);

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
		setAuthLoading((prev) => ({
			...prev,
			resetPassword: true,
		}));

		try {
			const actionCodeSettings = {
				// After password reset, the user will be give the ability to go back
				// to this page.
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/?email=${email}`,
				handleCodeInApp: false,
			};
			await sendPasswordResetEmail(auth, email, actionCodeSettings);

			toastNotify("success", "Password reset email sent");

			return {
				success: true,
			};
		} catch (error) {
			toastNotify("error", error);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				resetPassword: false,
			}));
		}
	};

	const sendEmailVerificationFunc = async () => {
		setAuthLoading((prev) => ({
			...prev,
			sendEmailLink: true,
		}));

		try {
			const actionCodeSettings = {
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/?email=${auth.currentUser.email}`,
				iOS: {
					bundleId: "com.example.ios",
				},
				android: {
					packageName: "com.example.android",
					installApp: true,
					minimumVersion: "12",
				},
				handleCodeInApp: true,
			};

			await sendEmailVerification(auth.currentUser, actionCodeSettings);

			// Obtain code from the user.
			// await applyActionCode(auth, code);

			toastNotify("success", "Email sent, check your inbox");
		} catch (error) {
			toastNotify("error", error);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				sendEmailLink: false,
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
		resetPasswordFunc,
		sendEmailVerificationFunc,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const AuthContext = () => {
	return useContext(Context);
};
