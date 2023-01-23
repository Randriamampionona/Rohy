import { Fragment } from "react";
import { MetaHead } from "../../../components/Common";
import getCurrentUserProps from "../../../utils/getCurrentUserProps";

const DashboardPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Dashboard"} />
			<section className="pageSection">DashboardPage</section>
		</Fragment>
	);
};

export default DashboardPage;

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
