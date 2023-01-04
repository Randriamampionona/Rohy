import { Fragment } from "react";
import { MetaHead } from "../../components/Common";
import getCurrentUserProps from "../../utils/getCurrentUserProps";

const OffersPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Our offers"} />
			<section className="pageSection">OffersPage</section>
		</Fragment>
	);
};

export default OffersPage;

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
