import axios from "axios";
import { Fragment } from "react";
import { MetaHead } from "../../../../../components/Common";
import { DashboardHOC } from "../../../../../components/HOC";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../../utils/axiosHeadersHandler";

const SubDetailsPage = ({ subDetails }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage subscription"} />

			<section className="w-full h-full">
				<pre>{JSON.stringify(subDetails, null, 2)}</pre>
			</section>
		</Fragment>
	);
};

export default DashboardHOC(SubDetailsPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// call get single sub API
		const URL = `/v1/admin/sub/${ctx.params.subscriptionID}`;
		const fetch = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					subDetails: result.payload,
				},
			};
		}
	} catch (error) {
		return {
			props: {
				...user,
			},
		};
	}
};
