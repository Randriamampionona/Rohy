import axios from "axios";
import { useState } from "react";
import { AuthContext } from "../store/context/AuthContext";
import toastNotify from "../utils/toastNotify";

const useGetActivePlan = () => {
	const { currentUser } = AuthContext();
	const [loading, setLoading] = useState(false);

	const getActivePlanFun = async () => {
		setLoading(true);
		try {
			if (!currentUser)
				return {
					active: false,
					details: null,
				};

			const URL = "/v1/sub/subscribe";
			const fetch = await axios.get(URL, { withCredentials: true });
			const result = fetch.data;

			if (result.success) {
				return result.payload;
			}

			toastNotify("error", result.message);
			return {
				active: false,
				details: null,
			};
		} catch (error) {
			return toastNotify("error", error.message);
		} finally {
			setLoading(false);
		}
	};

	return { getActivePlanFun, loading };
};

export default useGetActivePlan;
