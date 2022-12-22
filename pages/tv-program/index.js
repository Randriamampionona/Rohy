import { Fragment } from "react";
import { MetaHead, PageHeader } from "../../components/Common";

const TVProgramPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"All TV programes"} />

			<section className="pageSection">
				<PageHeader />
			</section>
		</Fragment>
	);
};

export default TVProgramPage;
