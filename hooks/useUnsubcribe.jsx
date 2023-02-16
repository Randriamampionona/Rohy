import axios from "axios";
import { useRouter } from "next/router";
import toastNotify from "../utils/toastNotify";

const useUnsubcribe = () => {
	const { push } = useRouter();

	const unsubcribeFunc = async () => {
		try {
			const URL = "/v1/sub/unsubscribe";
			const fetch = await axios.patch(URL, null, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return push("/account");
			}

			throw new Error(result.message);
		} catch (error) {
			console.log(error);
			toastNotify("error", error);
		} finally {
		}
	};

	return { unsubcribeFunc };
};

export default useUnsubcribe;
