import axios from "axios";
import toastNotify from "../utils/toastNotify";

const useUnsubcribe = () => {
	const unsubcribeFun = async () => {
		try {
			const URL = "/v1/sub/unsubscribe";
			const fetch = await axios.patch(URL, null, {
				withCredentials: true,
				headers: {
					type: "cancel",
				},
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
			}

			throw new Error(result.message);
		} catch (error) {
			console.log(error);
			toastNotify("error", error);
		} finally {
		}
	};

	return { unsubcribeFun };
};

export default useUnsubcribe;
