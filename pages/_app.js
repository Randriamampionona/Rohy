import { GlobalProvider } from "../store/context/GlobalContext";
import { AuthProvider } from "../store/context/AuthContext";
import "../styles/globals.css";
import { Layout } from "./../components/Layout";
import axios from "axios";
import NextNProgress from "nextjs-progressbar";
import { appWithTranslation } from "next-i18next";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const MyApp = ({ Component, pageProps }) => {
	return (
		<GlobalProvider>
			<AuthProvider currentUserProps={pageProps?.currentUserProps}>
				<Layout>
					<NextNProgress
						color="#b5004d"
						options={{ showSpinner: false }}
					/>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</GlobalProvider>
	);
};

export default appWithTranslation(MyApp);
