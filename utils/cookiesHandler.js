import axios from "axios";

const cookiesHandler = async (key, value = null) => {
	try {
		const URL = `/v1/auth/cookies/${key}`;

		if (key === "set") {
			const fetch = await axios.post(URL, null, {
				withCredentials: true,
				headers: { token: value },
			});

			const result = fetch.data;

			return result;
		}

		if (key === "destroy") {
			const fetch = await axios.delete(URL, {
				withCredentials: true,
			});

			const result = fetch.data;

			return result;
		}

		return;
	} catch (error) {
		console.log(error);
	}
};

export default cookiesHandler;
