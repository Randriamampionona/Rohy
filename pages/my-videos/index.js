import { Fragment } from "react";
import { MetaHead, PageHeader } from "../../components/Common";

const MyVideosPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"My videos"} />

			<section className="pageSection">
				<PageHeader />
			</section>
		</Fragment>
	);
};

export default MyVideosPage;
