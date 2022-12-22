import { useState } from "react";
import toastNotify from "../utils/toastNotify";
import axios from "axios";

const useListHandler = () => {
	const [loading, setLoading] = useState({ add: false, remove: false });

	const addToMyListFunc = async (videoDetails) => {
		setLoading((prev) => ({
			...prev,
			add: true,
		}));

		try {
			if (!videoDetails)
				return toastNotify("error", "Please provide a valide video");

			const URL = "/user/video/myList";
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
			setLoading((prev) => ({
				...prev,
				add: false,
			}));
		}
	};

	const removeFromMyListFunc = async (docID) => {
		setLoading((prev) => ({
			...prev,
			remove: true,
		}));

		try {
			if (!docID) return toastNotify("error", "Cannot find the video");

			const URL = "/user/video/myList";
			const fetch = await axios.delete(URL, {
				withCredentials: true,
				headers: { doc_id: docID },
			});
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
			setLoading((prev) => ({
				...prev,
				remove: false,
			}));
		}
	};

	return { addToMyListFunc, removeFromMyListFunc, loading };
};

export default useListHandler;
