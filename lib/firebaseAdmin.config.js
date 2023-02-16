const admin = require("firebase-admin");

const dev_serviceAccount = require("./serviceAccountKey.json"); // for dev only
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

try {
	admin.initializeApp({
		credential: admin.credential.cert(
			process.env.NODE_ENV === "production"
				? serviceAccount
				: dev_serviceAccount
		),
		databaseURL: "https://rohy-6025b-default-rtdb.firebaseio.com",
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
