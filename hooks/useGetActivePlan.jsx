import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const useGetActivePlan = () => {
	const [loading, setLoading] = useState(false);
	const { replace } = useRouter();

	const getActivePlanFunc = async () => {
		setLoading(true);
		try {
			const URL = "/v1/sub/current_sub";
			const fetch = await axios.get(URL, { withCredentials: true });
			const result = fetch.data;

			if (result.success)
				return {
					active:
						!!result.payload.status &&
						result.payload.status?.text === "active" &&
						result.payload.status?.code === 1,
					plan_details: result.payload.plan_details,
				};

			throw new Error(result.message);
		} catch (error) {
			console.log(error);
			return replace(`/offers`);
		} finally {
			setLoading(false);
		}
	};

	return { getActivePlanFunc, loading };
};

export default useGetActivePlan;
