import { AuthProvider } from "../store/context/AuthContext";
import "../styles/globals.css";
import { Layout } from "./../components/Layout";

const MyApp = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	);
};

export default MyApp;
