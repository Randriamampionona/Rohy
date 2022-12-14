import { Fragment } from "react";
import { IntroSlider, Prices, SupportDevice } from "../../components/Infos";
import getCurrentUserProps from "../../utils/getCurrentUserProps";
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
