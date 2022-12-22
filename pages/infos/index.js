import { Fragment } from "react";
import { IntroSlider, Prices, SupportDevice } from "../../components/Infos";
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
