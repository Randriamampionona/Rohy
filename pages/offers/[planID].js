import getCurrentUserProps from "../../utils/getCurrentUserProps";
import { Fragment, useEffect, useRef, useState } from "react";
import { MetaHead } from "../../components/Common";
import { PayPalButton } from "react-paypal-button-v2";

const PlanPage = () => {
	const [scripLoaded, setScriptLoaded] = useState(false);
	const paypal = useRef();

	useEffect(() => {
		const addPaypalScript = () => {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
			script.async = true;

			script.onload = () => setScriptLoaded(true);

			document.body.appendChild(script);
		};
		addPaypalScript();
	}, []);

	return (
		<Fragment>
			<MetaHead subTitle={`Plan - ${"Basic"}`} />
			<section className="pageSection mx-auto">
				{scripLoaded ? (
					<PayPalButton
						amount={45.0}
						onSuccess={(details, data) => {
							console.log(details);
						}}
					/>
				) : (
					<span>Loading...</span>
				)}
			</section>
		</Fragment>
	);
};

export default PlanPage;

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
