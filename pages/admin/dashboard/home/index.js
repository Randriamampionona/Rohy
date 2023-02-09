import { Fragment } from "react";
import { MetaHead } from "../../../../components/Common";
import { DashboardHOC } from "../../../../components/HOC";
import getCurrentUserProps from "../../../../utils/getCurrentUserProps";

const DashboardPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Dashboard"} />
			<section className="w-full h-full">DashboardPage</section>
		</Fragment>
	);
};

export default DashboardHOC(DashboardPage);

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
