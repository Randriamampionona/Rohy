import { auth__admin, db__admin } from "../lib/firebaseAdmin.config";
import nookies from "nookies";

const getCurrentUserProps = async ({ req, res }) => {
	try {
		const { user_token: userToken } = nookies.get(
			{ req, res },
			"user_token"
		);

		if (!userToken) throw new Error("User token missing");

		// verify user token
		const token = await auth__admin.verifyIdToken(userToken);

		if (!token)
			throw new Error("Something went wrong while verifying user token");

		// uid: user?.uid,
		// email: user?.email,
		// displayName: user?.displayName,
		// photoURL: user?.photoURL,
		// joinedOn: serverTimestamp(),

		// get user infos from db
		const docRef = db__admin.collection("users").doc(token.uid);
		const user = await docRef.get();

		if (!user.exists) throw new Error("No user was found");

		return {
			success: true,
			isVerified: true,
			currentUserProps: {
				...user.data(),
				...token,
				joinedOn: user.data()?.joinedOn?.toDate()?.toString(),
			},
		};
	} catch (error) {
		console.log(error.message);

		return {
			errorMsg: error.message,
			success: false,
			isVerified: false,
			currentUserProps: null,
		};
	}
};

export default getCurrentUserProps;
