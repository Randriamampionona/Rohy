import { useState } from "react";
import toastNotify from "../../utils/toastNotify";
import axios from "axios";

const useMovie = () => {
	const [loading, setLoading] = useState(false);

	const uploadFunc = async (data) => {
		setLoading(true);

		try {
			const URL = "v1/admin/movies/add";
			const fecth = await axios.post(URL, data, {
				withCredentials: true,
			});
			const result = fecth.data;

			if (result.success) {
				console.log(result.payload);
				return toastNotify("success", result.message);
			}

			throw new Error(result.message);
		} catch (error) {
			console.log(error);
			toastNotify(
				"error",
				error?.response?.data?.message || error.message
			);
		} finally {
			setLoading(false);
		}
	};

	return { loading, uploadFunc };
};

export default useMovie;
