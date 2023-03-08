import axios from "axios";
import { Fragment } from "react";
import { MetaHead } from "../../../../../components/Common";
import { DashboardHOC } from "../../../../../components/HOC";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../../utils/axiosHeadersHandler";

const UserDetailsPage = ({ userDetails }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage offers"} />

			<section className="w-full h-full">
				<pre>{JSON.stringify(userDetails, null, 2)}</pre>
			</section>
		</Fragment>
	);
};

export default DashboardHOC(UserDetailsPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// call get single user API
		const URL = `/v1/admin/users/${ctx.params.uid}`;
		const fetch = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					userDetails: result.payload,
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
