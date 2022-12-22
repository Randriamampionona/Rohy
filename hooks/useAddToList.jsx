import { useState } from "react";
import toastNotify from "./../utils/toastNotify";
import axios from "axios";

const useAddToMyList = () => {
	const [loading, setLoading] = useState(false);

	const addToListMyFunc = async (videoDetails) => {
		setLoading(true);

		try {
			if (!videoDetails)
				return toastNotify("error", "Please provide a valide video");

			const URL = "/user/video/addToMyList";
			const fetch = await axios.post(
				URL,
				{ videoDetails },
				{
					withCredentials: true,
				}
			);
			const result = fetch.data;

			if (result.success) {
				return toastNotify("success", result.message);
			}

			return toastNotify(
				"error",
				"Something went wrong, try again later"
			);
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setLoading(false);
		}
	};

	return { addToListMyFunc, loading };
};

export default useAddToMyList;
