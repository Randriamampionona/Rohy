import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toastNotify from "../utils/toastNotify";

const initStates = {
	add: false,
	update: false,
	delete: false,
};

const useOffer = () => {
	const [loading, setLoading] = useState(initStates);
	const { push } = useRouter();

	const baseURL = "/admin/dashboard/offers";

	const addFunc = async (data, action) => {
		setLoading((prev) => ({ ...prev, [action]: true }));

		try {
			const URL = `v1/admin/offers/add`;
			const fetch = await axios.post(URL, data, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return push(`${baseURL}/${result.payload.planID}`);
			}

			throw new Error(result.message);
		} catch (error) {
			toastNotify(
				"error",
				error?.response?.data?.message || error.message
			);
		} finally {
			setLoading((prev) => ({ ...prev, [action]: false }));
		}
	};

	const updateFunc = async (plan_id, data, action) => {
		setLoading((prev) => ({ ...prev, [action]: true }));

		try {
			const URL = `v1/admin/offers/update`;
			const fetch = await axios.patch(URL, data, {
				withCredentials: true,
				headers: { plan_id },
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return push(`${baseURL}/${plan_id}`);
			}

			throw new Error(result.message);
		} catch (error) {
			toastNotify(
				"error",
				error?.response?.data?.message || error.message
			);
		} finally {
			setLoading((prev) => ({ ...prev, [action]: false }));
		}
	};

	const deleteFunc = async (plan_id, action) => {
		if (!confirm("Delete plan?")) return;

		setLoading((prev) => ({
			...prev,
			[action]: { id: plan_id, load: true },
		}));

		try {
			const URL = `v1/admin/offers/delete`;
			const fetch = await axios.delete(URL, {
				withCredentials: true,
				headers: { plan_id },
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return push(baseURL);
			}

			throw new Error(result.message);
		} catch (error) {
			toastNotify(
				"error",
				error?.response?.data?.message || error.message
			);
		} finally {
			setLoading((prev) => ({ ...prev, [action]: false }));
		}
	};

	return { loading, addFunc, updateFunc, deleteFunc };
};

export default useOffer;
