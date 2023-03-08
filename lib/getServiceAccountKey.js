const serviceAccountKey = {
	type: process.env.NEXT_FIREBASE_TYPE,
	projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
	privateKeyId: process.env.NEXT_FIREBASE_PRIVATE_KEY_ID,
	privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY + "\n",
	clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
	clientId: process.env.NEXT_FIREBASE_CLIENT_ID,
	authUri: process.env.NEXT_FIREBASE_AUTH_URI,
	tokenUri: process.env.NEXT_FIREBASE_TOKEN_URI,
	authProviderX509CertUrl:
		process.env.NEXT_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
	clientX509CertUrl: process.env.NEXT_FIREBASE_CLIENT_X509_CERT_URL,
};

const getServiceAccountKey = () => {
	return serviceAccountKey;
};

export default getServiceAccountKey;
