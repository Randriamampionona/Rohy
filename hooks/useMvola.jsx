import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toastNotify from "../utils/toastNotify";
import useGetRedirectURL from "./useGetRedirectURL";

const useMvola = () => {
	const { getRedirectURLFunc } = useGetRedirectURL();
	const { replace } = useRouter();
	const [mvolaLoading, setMvolaLoading] = useState(false);

	const merchantPaymentFunc = async (planID) => {
		setMvolaLoading(true);

		try {
			const URL = "/v1/sub/mvola";

			const data = { planID };
			const fetch = await axios.post(URL, data, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return replace(getRedirectURLFunc("/my-subscription"));
			}

			throw new Error(result.message || "Payment error (Mvola)");
		} catch (error) {
			console.log(error);
			return toastNotify("error", error);
		} finally {
			setMvolaLoading(false);
		}
	};

	return { merchantPaymentFunc, mvolaLoading };
};

export default useMvola;
