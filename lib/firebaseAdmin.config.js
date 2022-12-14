const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
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

export default admin;
