import { Fragment } from "react";
import { IntroSlider, Prices, SupportDevice } from "../../components/Infos";
import getCurrentUserProps from "../../utils/getCurrentUserProps";
import getServerSideTranslations from "../../utils/getServerSideTranslations";
import { MetaHead } from "./../../components/Common";

const HomePage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Get started with us"} />

			<section>
				<IntroSlider />
				<SupportDevice />
				<Prices />
			</section>
		</Fragment>
	);
};

export default HomePage;

export const getServerSideProps = async (ctx) => {
	const translations = await getServerSideTranslations(ctx, ["infos"]);
	const user = await getCurrentUserProps(ctx);

	try {
		return {
			props: {
				...translations,
				...user,
			},
		};
	} catch (error) {
		return {
			props: {
				...translations,
				...user,
			},
		};
	}
};
