import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";
import { MetaHead } from "../../components/Common";
import { useUnsubcribe } from "../../hooks";
import getCurrentUserProps from "../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../utils/axiosHeadersHandler";
import ssrErrorHandler from "./../../utils/ssrErrorHandler";

const MySubscriptionPage = ({ mySubscriptionData }) => {
	const { unsubcribeFun } = useUnsubcribe();

	const unsubHandler = async () => {
		if (confirm("Do you really wanna Unsubscribe your plan?")) {
			await unsubcribeFun();
		}
	};

	return (
		<Fragment>
			<MetaHead subTitle={"My subscription"} />
			<section className="pageSection">
				<main className="flex flex-col items-center justify-center w-full my-auto mx-auto sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
					<pre className="w-full p-4 bg-lightDarkColor rounded mb-4 overflow-y-auto">
						{JSON.stringify(mySubscriptionData, null, 2)}
					</pre>

					{mySubscriptionData.active &&
					mySubscriptionData.plan_details ? (
						<button
							className="outlineBtn mx-auto"
							onClick={unsubHandler}>
							<span>Unsubscribe</span>
						</button>
					) : (
						<div className="flex flex-col items-center justify-center w-full">
							<p className="text-center max-w-[75%] mb-4 md:max-w-[50%] lg:max-w-[45%]">
								Seems like you don&apos;t have any active plan
								yet
							</p>
							<p className="text-center text-primaryColor underline">
								<Link href={"/offers"}>
									<a>Active my plan</a>
								</Link>
							</p>
						</div>
					)}
				</main>
			</section>
		</Fragment>
	);
};

export default MySubscriptionPage;

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get subscription infos
		const URL = "/v1/sub";
		const fecth = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fecth.data;

		if (result.success) {
			return {
				props: {
					...user,
					mySubscriptionData: result.payload,
				},
			};
		}
	} catch (error) {
		return ssrErrorHandler(error, { ...user });
	}
};
