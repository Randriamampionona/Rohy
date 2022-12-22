import { Fragment } from "react";
import { MetaHead, PageHeader } from "../../components/Common";

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
