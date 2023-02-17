import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: process.env.NEXT_DATABASE_URL,
	});
} catch (error) {
	/*
	 * We skip the "already exists" message which is
	 * not an actual error when we're hot-reloading.
	 */
	if (!/already exists/u.test(error.message)) {
		console.error("Firebase admin initialization error", error.stack);
	}
}

const auth__admin = admin.auth();
const db__admin = admin.firestore();
const storage__admin = admin.storage();

export default admin;
export { auth__admin, db__admin, storage__admin };
