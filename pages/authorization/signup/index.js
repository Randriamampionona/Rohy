import { AuthForm } from "../../../components/Common";
import nookies from "nookies";
import admin from "../../../lib/firebaseAdmin.config";

const SignupPage = () => {
	return (
		<section className="flex items-center justify-center h-screen">
			<AuthForm page={"signup"} />
		</section>
	);
};

export default SignupPage;

export const getServerSideProps = async (ctx) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await admin.auth().verifyIdToken(cookies);

		if (token) {
			return {
				props: {
					redirect: {
						destination: "/",
						permanent: false,
					},
				},
			};
		}
	} catch (error) {
		return { props: {} };
	}
};
