import { AuthForm } from "../../../components/Common";
import nookies from "nookies";
import admin from "../../../lib/firebaseAdmin.config";

const SigninPage = () => {
	return (
		<section className="flex items-center justify-center h-screen">
			<AuthForm page={"signin"} />
		</section>
	);
};

export default SigninPage;

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
