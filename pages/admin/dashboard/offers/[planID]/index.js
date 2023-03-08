import axios from "axios";
import { Fragment } from "react";
import { MetaHead } from "../../../../../components/Common";
import { DashboardHOC } from "../../../../../components/HOC";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../../utils/axiosHeadersHandler";

const PlanDetailsPage = ({ planDetails }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage offers"} />

			<section className="w-full h-full">
				<pre>{JSON.stringify(planDetails, null, 2)}</pre>
			</section>
		</Fragment>
	);
};

export default DashboardHOC(PlanDetailsPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// call get single offer API
		const URL = `/v1/admin/offers/${ctx.params.planID}`;
		const fetch = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					planDetails: result.payload,
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
