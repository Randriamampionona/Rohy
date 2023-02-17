import { Fragment } from "react";
import { MetaHead, OfferForm } from "../../../../../components/Common";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import DashboardHOC from "./../../../../../components/HOC/Dashboard.HOC";

const AddOfferPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage movies"} />

			<section className="w-full h-full">
				<h1 className="text-center text-xl uppercase font-medium mb-8">
					Add new offer
				</h1>
				<OfferForm />
			</section>
		</Fragment>
	);
};

export default DashboardHOC(AddOfferPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		return {
			props: {
				...user,
			},
		};
	} catch (error) {
		return {
			props: {
				...user,
			},
		};
	}
};
