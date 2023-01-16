import { Fragment } from "react";
import { MetaHead } from "../../components/Common";
import { useUnsubcribe } from "../../hooks";
import getCurrentUserProps from "../../utils/getCurrentUserProps";

const MySubscriptionPage = () => {
	const { unsubcribeFun } = useUnsubcribe();

	const unsubHandler = async () => {
		if (confirm("Unsubscribed ?")) {
			await unsubcribeFun();
		}
	};

	return (
		<Fragment>
			<MetaHead subTitle={"My subscription"} />
			<section className="pageSection">
				MySubscriptionPage
				<button className="outlineBtn" onClick={unsubHandler}>
					<span>Unsubscribe</span>
				</button>
			</section>
		</Fragment>
	);
};

export default MySubscriptionPage;

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
