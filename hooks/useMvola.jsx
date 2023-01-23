import axios from "axios";
import toastNotify from "../utils/toastNotify";

const useMvola = () => {
	const merchantPaymentFunc = async () => {
		try {
			const URL = "/v1/sub/mvola";

			const fetch = await axios.get(URL, { withCredentials: true });
			const result = fetch.data;

			console.log(result);

			throw new Error(result.message || "Payment error (Mvola)");
		} catch (error) {
			console.log(error);
			toastNotify("error", error);
		}
	};

	// other API calls

	return { merchantPaymentFunc };
};

export default useMvola;
