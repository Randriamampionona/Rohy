import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config";
import toastNotify from "../utils/toastNotify";

const useSaveUser = () => {
	const saveUserFunc = async (user) => {
		try {
			const docRef = doc(db, "users", user?.uid);
			const userDoc = await getDoc(docRef);

			// save user if not yet saved
			if (!userDoc.exists()) {
				const userData = {
					uid: user?.uid,
					email: user?.email,
					displayName: user?.displayName,
					photoURL: user?.photoURL,
					joinedOn: serverTimestamp(),
				};

				await setDoc(docRef, userData);
			}
		} catch (error) {
			toastNotify("error", error.message);
		}
	};

	return { saveUserFunc };
};

export default useSaveUser;
