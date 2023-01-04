import { Fragment } from "react";
import { MetaHead } from "../../components/Common";
import getCurrentUserProps from "../../utils/getCurrentUserProps";

const ContactPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Get in touch"} />
			<section className="pageSection">ContactPage</section>
		</Fragment>
	);
};

export default ContactPage;

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
