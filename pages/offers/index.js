import getCurrentUserProps from "../../utils/getCurrentUserProps";
import { Fragment } from "react";
import { MetaHead } from "../../components/Common";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/router";
import priceFomator from "./../../utils/priceFormator";

const OffersPage = ({ plansList }) => {
	const { push } = useRouter();

	const navigateHandler = (r) => push(`/offers/${r}?`);

	return (
		<Fragment>
			<MetaHead subTitle={"Our offers"} />
			<section className="pageSection">
				<h1 className="text-3xl font-bold uppercase text-center w-full">
					Select your plan
				</h1>

				<main className="grid grid-cols-1 items-center gap-x-0 gap-y-8 max-w-[55rem] mx-auto py-8 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-0">
					{plansList?.map((plan) => (
						<div
							key={plan.planID}
							className={`relative w-full p-4 rounded-md border border-primaryColor bg-lightDarkColor shadow-md shadow-darkColor cursor-default transition-transform duration-150 ease-in-out hover:scale-[1.02] ${
								plan.popular && "bg-primaryColor"
							}`}
							onClick={(_) => navigateHandler(plan.planID)}>
							{plan.popular && <Badge />}
							<h2
								className={`text-center text-base text-whiteColor/80 font-semibold uppercase`}>
								{plan.title}
							</h2>
							<div className={`my-6`}>
								<h1 className="text-center text-5xl font-bold leading-none">
									<sup className="text-base font-normal">
										Ar
									</sup>
									{priceFomator(plan.price.regular)}{" "}
									<sub
										className={`bottom-0 right-2 text-base ${
											plan.popular
												? "text-whiteColor"
												: "text-primaryColor"
										}`}>
										/mois
									</sub>
								</h1>
							</div>
							<p className="text-center mb-6">
								{plan.popular
									? plan.desc.substring(0, 118)
									: plan.desc.substring(0, 88)}
								...
							</p>

							<ul className="mb-6 space-y-2">
								{plan.specificity.map((sp) => (
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

							<button
								className={`primaryBtn ${
									plan.popular && "secondaryBtn"
								} w-full`}
								onClick={(e) => e.stopPropagation()}>
								<span>Apply now</span>
							</button>
						</div>
					))}
				</main>
			</section>
		</Fragment>
	);
};

export default OffersPage;

const Badge = () => {
	return (
		<h3 className="absolute top-0 right-4 -translate-y-1/2 text-xs text-darkColor font-medium uppercase px-2 py-[2px] rounded-full bg-whiteColor border border-yellow-400">
			popular
		</h3>
	);
};

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get plan list from DB
		const URL = `/v1/offer`;
		const fetch = await axios.get(URL, { withCredentials: true });
		const result = fetch.data;

		return {
			props: {
				...user,
				plansList: result.success ? result.payload : [],
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
