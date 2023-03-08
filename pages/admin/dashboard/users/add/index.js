import { Fragment } from "react";
import { MetaHead, UserForm } from "../../../../../components/Common";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import DashboardHOC from "../../../../../components/HOC/Dashboard.HOC";

const AddOfferPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage offers"} />

			<section className="w-full h-full">
				<h1 className="text-center text-xl uppercase font-medium mb-8">
					Add new offer
				</h1>
				<UserForm />
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
