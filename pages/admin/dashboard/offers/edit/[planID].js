import { Fragment } from "react";
import { MetaHead, OfferForm } from "../../../../../components/Common";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import DashboardHOC from "../../../../../components/HOC/Dashboard.HOC";
import axios from "axios";
import axiosHeadersHandler from "../../../../../utils/axiosHeadersHandler";

const EditOfferPage = ({ currentValues }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage offers"} />

			<section className="w-full h-full">
				<h1 className="text-center text-xl uppercase font-medium mb-8">
					Update offer
				</h1>
				<OfferForm currentValues={currentValues} />
			</section>
		</Fragment>
	);
};

export default DashboardHOC(EditOfferPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get current data
		const URL = `/v1/admin/offers/${ctx.params.planID}`;
		const fetch = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					currentValues: {
						name: result.payload.name,
						desc: result.payload.desc,
						regular: result.payload.price.regular,
						promo: result.payload.price.promo,
						order: result.payload.order,
						specificity: result.payload.specificity,
					},
				},
			};
		}
	} catch (error) {
		return {
			props: {
				...user,
				currentValues: null,
			},
		};
	}
};
