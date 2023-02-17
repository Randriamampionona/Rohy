import axios from "axios";
import { Fragment } from "react";
import { ButtonSection, MetaHead } from "../../../../../components/Common";
import { DashboardHOC } from "../../../../../components/HOC";
import { useOffer } from "../../../../../hooks";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../../utils/axiosHeadersHandler";

const PlanDetailsPage = ({ planDetails }) => {
	const { deleteFunc, loading } = useOffer();

	const deleteHandler = async () =>
		await deleteFunc(planDetails.planID, "delete");

	return (
		<Fragment>
			<MetaHead subTitle={"Manage offers"} />

			<section className="w-full h-full">
				<pre>{JSON.stringify(planDetails, null, 2)}</pre>
				<ButtonSection
					navigateLink={`/admin/dashboard/offers/add?id${planDetails.planID}&action=update&key=6574151451`}
					deleteHandler={deleteHandler}
					loading={!!loading.delete}
				/>
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
