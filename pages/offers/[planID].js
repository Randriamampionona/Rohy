/* eslint-disable react-hooks/exhaustive-deps */
import getCurrentUserProps from "../../utils/getCurrentUserProps";
import { Fragment, useEffect, useState } from "react";
import { MetaHead, MvolaBtn } from "../../components/Common";
import axios from "axios";
import priceFomator from "../../utils/priceFormator";
import { FaCheck, FaSignInAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/context/AuthContext";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import ssrErrorHandler from "./../../utils/ssrErrorHandler";
import { useGetActivePlan, useSubscribe } from "../../hooks";

const PlanPage = ({ planDetails }) => {
	const { currentUser } = AuthContext();
	const { subLoading, subscribeFunc } = useSubscribe();
	const { getActivePlanFunc, loading } = useGetActivePlan();

	const [activePlan, setActivePlan] = useState({
		active: false,
		plan_details: null,
	});
	const [showPayBtn, setShowPayBtn] = useState(false);
	const { push } = useRouter();

	// get active plan CLIENT SIDE
	useEffect(() => {
		(async () => {
			const { active, plan_details } = await getActivePlanFunc();
			setActivePlan({ active, plan_details });
		})();
	}, []);

	const payWithMvolaHandler = async () => {
		await subscribeFunc(planDetails.planID, "mvola");
	};

	return (
		<Fragment>
			<MetaHead subTitle={`Plan - ${planDetails.name}`} />
			<section className="pageSection my-8 grid gap-x-0 gap-y-16 mx-auto md:grid-cols-4 md:gap-x-6">
				{/* details */}
				<div className="md:col-span-3">
					<h1 className="text-2xl font-bold uppercase mb-1">
						{planDetails.name} plan
					</h1>
					<h2 className="text-2xl text-primaryColor font-medium">
						{priceFomator(planDetails.price.regular)}{" "}
						<sub className="text-sm bottom-0">Ar/mois</sub>
					</h2>

					{/* spacer */}
					<hr className="w-1/6 my-5 border-0 border-b-[1px] border-whiteColor/10" />

					<div className="mb-4">
						<h3 className="underline mb-2 text-whiteColor/70">
							Overview:
						</h3>
						<p className="md:max-w-[95%]">{planDetails.desc}</p>
					</div>

					<div>
						<h3 className="underline mb-2 text-whiteColor/70">
							Specificity:
						</h3>
						<ul>
							{planDetails.specificity.map((sp) => (
								<li key={sp}>
									<div className="flex items-center space-x-3">
										<span className="text-green-400">
											<FaCheck />
										</span>
										<span>{sp}</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* payment btn */}
				<div className="w-full mx-auto">
					{loading ? (
						<div className="flex items-center justify-center w-full h-28 bg-lightDarkColor rounded-md p-4">
							<span className="animate-spin">
								<ImSpinner2 />
							</span>
						</div>
					) : (
						<Fragment>
							{currentUser ? (
								<Fragment>
									{!activePlan.active ? ( //if no active plan
										<div className="w-full bg-lightDarkColor rounded-md p-4">
											<Fragment>
												{!showPayBtn ? (
													<div className="w-full">
														<div className="flex items-center justify-between mb-4">
															<span className="underline">
																Fee:
															</span>
															<span>0 Ar</span>
														</div>
														<div className="flex items-center justify-between">
															<span className="underline">
																Total:
															</span>
															<span>
																{priceFomator(
																	planDetails
																		.price
																		.regular
																)}{" "}
																Ar
															</span>
														</div>

														{/* spacer */}
														<hr className="w-full my-8 border-0 border-b-[0.15px] border-whiteColor/10" />

														<button
															className="primaryBtn w-full"
															onClick={(_) =>
																setShowPayBtn(
																	true
																)
															}>
															<span>
																Subscribe
															</span>
														</button>
													</div>
												) : (
													<div className="w-full">
														<MvolaBtn
															loading={
																subLoading.mvola
															}
															onClick={
																payWithMvolaHandler
															}
														/>
													</div>
												)}
											</Fragment>
										</div>
									) : (
										<div className="w-full bg-lightDarkColor rounded-md p-4">
											<p>
												You are already subscribed to a{" "}
												<span className="uppercase">
													{
														activePlan.plan_details
															.name
													}
												</span>{" "}
												plan.{" "}
												<Link href={"/my-subscription"}>
													<a className="underline text-primaryColor">
														My subscription details
													</a>
												</Link>
											</p>
										</div>
									)}
								</Fragment>
							) : (
								<div className="w-full">
									<p className="text-center mb-4">
										Sorry, you are not authenticated, please
										sign in
									</p>

									{/* sigin btn */}
									<button
										className="primaryBtn w-full mb-2"
										onClick={(_) =>
											push(
												`/authorization/signin?rdc=offers/${planDetails.planID}`
											)
										}>
										<span>
											<FaSignInAlt />
										</span>
										<span>Sign In</span>
									</button>

									<p className="text-center">
										Don&apos;t have an account?{" "}
										<Link
											href={`/authorization/signup?rdc=offers/${planDetails.planID}`}>
											<a className="text-primaryColor underline">
												sign up
											</a>
										</Link>
									</p>
								</div>
							)}
						</Fragment>
					)}
				</div>
			</section>
		</Fragment>
	);
};

export default PlanPage;

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get selected plan details
		const URL = `/v1/offer/${ctx.query.planID}`;

		const fetch = await axios.get(URL);
		const result = fetch.data;

		return {
			props: {
				...user,
				planDetails: result.payload,
			},
		};
	} catch (error) {
		return ssrErrorHandler(error, { ...user });
	}
};
