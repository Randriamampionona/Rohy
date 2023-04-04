import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toastNotify from "../../utils/toastNotify";

const initStates = {
	add: false,
	change_role: false,
	disabled: false,
};

const useUsers = () => {
	const { push } = useRouter();
	const [loading, setLoading] = useState(initStates);

	const baseURL = "/admin/dashboard/users";

	const addFunc = async (data, action) => {
		setLoading((prev) => ({ ...prev, [action]: true }));

		try {
			const URL = "/v1/admin/users/add";
			const fetch = await axios.post(URL, data, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return push(`${baseURL}/${result.payload.uid}`);
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

	const changeRoleFunc = async (uid, data, action) => {
		setLoading((prev) => ({
			...prev,
			[action]: { id: uid, load: true },
		}));

		try {
			const URL = "/v1/admin/users/change_role";
			const fetch = await axios.patch(URL, data, {
				withCredentials: true,
				headers: { uid },
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

	const disabledFunc = async (uid, data, action) => {
		setLoading((prev) => ({
			...prev,
			[action]: { id: uid, load: true },
		}));

		try {
			const URL = "/v1/admin/users/disabled";
			const fetch = await axios.patch(URL, data, {
				withCredentials: true,
				headers: { uid },
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

	return { loading, addFunc, changeRoleFunc, disabledFunc };
};

export default useUsers;
