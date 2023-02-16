import { GlobalProvider } from "../store/context/GlobalContext";
import { AuthProvider } from "../store/context/AuthContext";
import "../styles/globals.css";
import { Layout } from "./../components/Layout";
import axios from "axios";
import NextNProgress from "nextjs-progressbar";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BASE_ENDPOINT}/api`;

const MyApp = ({ Component, pageProps }) => {
	return (
		<GlobalProvider errorProps={pageProps?.errorProps}>
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

export default MyApp;
