import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { AuthContext } from "../store/context/AuthContext";

const useGetActivePlan = () => {
	const { currentUser } = AuthContext();
	const [loading, setLoading] = useState(false);
	const { replace, pathname, query } = useRouter();

	const getActivePlanFun = async () => {
		setLoading(true);
		try {
			if (!currentUser)
				return (
					pathname.includes("watch") &&
					replace(`/authorization/signin?rdc=watch/${query.videoID}`)
				);

			const URL = "/v1/sub";
			const fetch = await axios.get(URL, { withCredentials: true });
			const result = fetch.data;

			if (result.success) return result.payload;

			throw new Error(result.message);
		} catch (error) {
			return replace(`/offers`);
		} finally {
			setLoading(false);
		}
	};

	return { getActivePlanFun, loading };
};

export default useGetActivePlan;
