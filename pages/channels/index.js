import { Fragment } from "react";
import { MetaHead, PageHeader } from "../../components/Common";
import getCurrentUserProps from "../../utils/getCurrentUserProps";

const ChannelsPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Channels"} />
			<section className="pageSection">
				<PageHeader />
			</section>
		</Fragment>
	);
};

export default ChannelsPage;

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
