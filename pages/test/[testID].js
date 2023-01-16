import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import ssrErrorHandler from "./../../utils/ssrErrorHandler";
import { GlobalContext } from "../../store/context/GlobalContext";
import { Error } from "../../components/Common";

const TestIDPage = ({ data }) => {
	const { error } = GlobalContext();
	const { query } = useRouter();

	if (error) return <Error />;

	return (
		<div>
			Test ID Page {query.testID}
			<div>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</div>
	);
};

export default TestIDPage;

export const getServerSideProps = async (_ctx) => {
	try {
		const URL = `/v1/videos/55454`;
		const fetch = await axios.get(URL, { withCredentials: true });
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					data: result.payload,
				},
			};
		}
	} catch (error) {
		return ssrErrorHandler(error, {});
	}
};
