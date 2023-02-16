import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toastNotify from "../utils/toastNotify";
import useGetRedirectURL from "./useGetRedirectURL";

const initStates = {
	mvola: false,
	orangeMoney: false,
	airtelMoney: false,
};

const useSubscribe = () => {
	const { getRedirectURLFunc } = useGetRedirectURL();
	const { replace } = useRouter();
	const [subLoading, setSubLoading] = useState(initStates);

	const subscribeFunc = async (planID, paymentMethod) => {
		setSubLoading((prev) => ({
			...prev,
			[paymentMethod]: true,
		}));

		try {
			const URL = "/v1/sub/subscribe";

			const data = { planID };
			const fetch = await axios.post(URL, data, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return replace(getRedirectURLFunc("/my-subscription"));
			}

			throw new Error(result.message || "Payment error");
		} catch (error) {
			console.log(error);
			return toastNotify("error", error);
		} finally {
			setSubLoading((prev) => ({
				...prev,
				[paymentMethod]: false,
			}));
		}
	};

	return { subscribeFunc, subLoading };
};

export default useSubscribe;
