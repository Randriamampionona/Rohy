import { AuthProvider } from "../store/context/AuthContext";
import "../styles/globals.css";
import { Layout } from "./../components/Layout";
import axios from "axios";

axios.defaults.baseURL =
	process.env.NODE_ENV === "production"
		? "https://rohy.vercel.app/api"
		: "http://localhost:3000/api";

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
