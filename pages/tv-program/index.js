import { Fragment } from "react";
import { MetaHead, PageHeader } from "../../components/Common";
import getCurrentUserProps from "./../../utils/getCurrentUserProps";

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
