import axios from "axios";
import toastNotify from "../utils/toastNotify";

const useMvola = () => {
	const merchantPaymentFunc = async (planID) => {
		try {
			const URL = "/v1/sub/mvola";

			const data = { planID };
			const fetch = await axios.post(URL, data, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				return toastNotify("success", result.message);
			}

			throw new Error(result.message || "Payment error (Mvola)");
		} catch (error) {
			console.log(error);
			return toastNotify("error", error);
		}
	};

	// other API calls

	return { merchantPaymentFunc };
};

export default useMvola;
