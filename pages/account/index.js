import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { MetaHead } from "../../components/Common";
import { AuthContext } from "../../store/context/AuthContext";
import axiosHeadersHandler from "../../utils/axiosHeadersHandler";
import getCurrentUserProps from "../../utils/getCurrentUserProps";
import ssrErrorHandler from "./../../utils/ssrErrorHandler";

const AccountPage = ({ subscriptionInfos }) => {
	const { currentUser, signoutFunc, authLoading } = AuthContext();

	const signOutHandler = async () => {
		await signoutFunc();
	};

	return (
		<Fragment>
			<MetaHead subTitle={"My account"} />
			<section className="pageSection mx-auto">
				<h1 className="text-center text-2xl font-semibold mb-8">
					My account
				</h1>

				<main className="max-w-xl w-full mx-auto space-y-8">
					{/* personal infos */}
					<div className="w-full space-y-4">
						<h1 className="text-2xl font-semibold">
							My personal information
						</h1>

						<BlockUI
							lText={"Username"}
							RText={currentUser?.displayName}
						/>
					</div>

					{/* my sub */}
					<div className="w-full space-y-4">
						<h1 className="text-2xl font-semibold">
							My subscription
						</h1>

						<div className="w-full divide-y-[1px] divide-whiteColor/10">
							{subscriptionInfos.active &&
							subscriptionInfos.plan_details ? (
								<Fragment>
									<BlockUI
										lText={"Plan"}
										RText={
											subscriptionInfos.plan_details.name
										}
									/>
									<BlockUI
										lText={"Due date"}
										RText={new Date(
											subscriptionInfos.end
										).toDateString()}
									/>
									<BlockUI
										lText={"Subscription"}
										link={{
											slug: "/my-subscription",
											text: "Manage my subscription",
										}}
									/>
								</Fragment>
							) : (
								<div className="flex flex-col items-center justify-center w-full p-4 rounded-sm bg-lightDarkColor">
									<p className="text-center max-w-[75%] mb-4 md:max-w-[50%] lg:max-w-[45%]">
										Seems like you don&apos;t have any
										active plan yet
									</p>
									<p className="text-center text-primaryColor underline">
										<Link href={"/offers"}>
											<a>Active my plan</a>
										</Link>
									</p>
								</div>
							)}
						</div>
					</div>

					{/* my account */}
					<div className="w-full space-y-4">
						<h1 className="text-2xl font-semibold">
							My Rohy account
						</h1>

						<div className="w-full divide-y-[1px] divide-whiteColor/10">
							<BlockUI
								lText={currentUser?.email}
								link={{
									slug: "/account/edit?key=email",
									text: "Modify",
								}}
							/>
							<BlockUI
								lText={"Password"}
								link={{
									slug: "/account/edit?key=password",
									text: "Modify",
								}}
							/>
						</div>
					</div>

					{/* logout btn */}
					<button
						className="primaryBtn w-[calc(100%-1rem)] mx-auto my-2"
						onClick={signOutHandler}>
						{authLoading.signout ? (
							<span className="animate-spin">
								<ImSpinner2 />
							</span>
						) : (
							<>
								<span>
									<FaSignOutAlt />
								</span>
								<span>Log Out</span>
							</>
						)}
					</button>
				</main>
			</section>
		</Fragment>
	);
};

export default AccountPage;

const BlockUI = ({ lText, RText, link = null }) => {
	return (
		<div className="flex items-center justify-between w-full p-4 rounded-sm bg-lightDarkColor">
			<p className="font-medium">{lText}</p>
			<p
				className={`text-end ${
					link
						? "text-primaryColor hover:underline"
						: "text-gray-500 uppercase"
				}`}>
				{link ? (
					<Link href={link?.slug}>
						<a>{link?.text}</a>
					</Link>
				) : (
					RText
				)}
			</p>
		</div>
	);
};

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get subscription
		const URL = "/v1/sub";
		const fetch = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					subscriptionInfos: result.payload,
				},
			};
		}

		throw new Error(result.message);
	} catch (error) {
		return ssrErrorHandler(error, { ...user });
	}
};
