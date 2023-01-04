import { Fragment } from "react";
import { MetaHead } from "../../components/Common";
import getCurrentUserProps from "../../utils/getCurrentUserProps";

const AppsPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Applications"} />
			<section className="pageSection">AppsPage</section>
		</Fragment>
	);
};

export default AppsPage;

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
