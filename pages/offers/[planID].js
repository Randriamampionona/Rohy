/* eslint-disable react-hooks/exhaustive-deps */
import getCurrentUserProps from "../../utils/getCurrentUserProps";
import { Fragment, useEffect, useState } from "react";
import { MetaHead, MvolaBtn } from "../../components/Common";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
import priceFomator from "../../utils/priceFormator";
import { FaCheck, FaRedoAlt, FaSignInAlt } from "react-icons/fa";
import toastNotify from "../../utils/toastNotify";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/context/AuthContext";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import ssrErrorHandler from "./../../utils/ssrErrorHandler";
import { useGetActivePlan, useGetRedirectURL, useMvola } from "../../hooks";

const PlanPage = ({ planDetails }) => {
	const { currentUser } = AuthContext();
	const { merchantPaymentFunc } = useMvola();
	const { getActivePlanFun, loading } = useGetActivePlan();
	const { getRedirectURLFunc } = useGetRedirectURL();

	const [activePlan, setActivePlan] = useState({
		active: false,
		plan_details: null,
	});
	const [scripLoaded, setScriptLoaded] = useState(false);
	const [showPayBtn, setShowPayBtn] = useState(false);
	const [isError, setIsError] = useState(null);
	const { reload, push, replace } = useRouter();

	// prepare paypal script
	useEffect(() => {
		const addPaypalScript = () => {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
			script.async = true;

			script.onload = () => setScriptLoaded(true);

			document.body.appendChild(script);
		};
		!showPayBtn && addPaypalScript();
	}, [showPayBtn]);

	// get active plan CLIENT SIDE
	useEffect(() => {
		(async () => {
			const { active, plan_details } = await getActivePlanFun();
			setActivePlan({ active, plan_details });
		})();
	}, []);

	const onSuccessHandler = async (details, data) => {
		toastNotify(
			"success",
			`Transaction completed by ${details.payer.name.given_name}`
		);

		// call subscribe api & save transaction
		const body = {
			details,
			data,
			plan: {
				id: planDetails.planID,
				name: planDetails.name,
			},
		};

		try {
			const URL = `/v1/sub/subscribe`;
			const fetch = await axios.post(URL, body, {
				withCredentials: true,
			});
			const result = fetch.data;

			if (result.success) {
				toastNotify("success", result.message);
				return replace(getRedirectURLFunc("/my-subscription"));
			}

			throw new Error(result.message);
		} catch (error) {
			console.log(error);
			return toastNotify("error", error?.response.data.message);
		}
	};

	const onErrorHandler = (err) => {
		setIsError(true);
		console.log(err);
	};

	const onCacelHandler = (_data) => {
		toastNotify(null, "Subscription canceled");
	};

	const payWithMvolaHandler = async () => {
		await merchantPaymentFunc();
	};

	return (
		<Fragment>
			<MetaHead subTitle={`Plan - ${planDetails.name}`} />
			{isError ? (
				<section className="pageSection flex flex-col items-center justify-center my-9">
					<h1 className="text-center text-2xl text-red-500 font-semibold mb-6">
						Payment error
					</h1>
					<p className="text-center max-w-[25%]">
						Something went wrong, try to refresh this page and try
						again
					</p>
					<code className="text-center text-whiteColor/70">
						error_code_402: payment required
					</code>
					<button className="group outlineBtn mt-4" onClick={reload}>
						<span>
							<FaRedoAlt />
						</span>
						<span>Refresh</span>
					</button>
				</section>
			) : (
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

					{/* paypal btn */}
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
																<span>
																	0 Ar
																</span>
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
															{scripLoaded ? (
																<PayPalButton
																	amount={
																		// planDetails.price.regular
																		5
																	}
																	onSuccess={
																		onSuccessHandler
																	}
																	onError={
																		onErrorHandler
																	}
																	onCancel={
																		onCacelHandler
																	}
																	options={{
																		clientId:
																			process
																				.env
																				.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
																		currency:
																			"USD",
																	}}
																/>
															) : (
																<span>
																	Loading...
																</span>
															)}
															<MvolaBtn
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
													You are already subscribed
													to a{" "}
													<span className="uppercase">
														{
															activePlan
																.plan_details
																.name
														}
													</span>{" "}
													plan.{" "}
													<Link
														href={
															"/my-subscription"
														}>
														<a className="underline text-primaryColor">
															My subscription
															details
														</a>
													</Link>
												</p>
											</div>
										)}
									</Fragment>
								) : (
									<div className="w-full">
										<p className="text-center mb-4">
											Sorry, you are not authenticated,
											please sign in
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
			)}
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
