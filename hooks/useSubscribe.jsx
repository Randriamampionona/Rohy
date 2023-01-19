import { useRouter } from "next/router";
import { useState } from "react";

const useSubscribe = () => {
	const { replace } = useRouter();
	const [loading, setLoading] = useState(false);

	const subscribeFun = async ({ details, data, plan }) => {
		setLoading(true);

		try {
			const URL = `/v1/sub/subscribe`;
			const DATA = {
				details,
				data,
				plan: {
					id: plan.planID,
					name: plan.name,
				},
			};
			const fetch = await axios.post(URL, DATA, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return replace("/my-subscription");
			}

			throw new Error(result.message);
		} catch (error) {
			console.log(error);
			return toastNotify("error", error?.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	return { subscribeFun, loading };
};

export default useSubscribe;
