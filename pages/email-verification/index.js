import { Fragment, useEffect, useState } from "react";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { AuthContext } from "../../store/context/AuthContext";
import { ButtonWithLoading, MetaHead } from "./../../components/Common";
import getCurrentUserProps from "./../../utils/getCurrentUserProps";

const EmailVerificationPage = () => {
	const { sendEmailVerificationFunc, authLoading } = AuthContext();
	const [isSent, setIsSent] = useState(false);

	useEffect(() => {
		const timiID = setInterval(() => {
			setIsSent((prev) => prev !== false && false);
		}, 10000);

		return () => clearInterval(timiID);
	}, []);

	const sendLinkHandler = async () => {
		await sendEmailVerificationFunc();
		setIsSent(true);
	};

	return (
		<Fragment>
			<MetaHead subTitle={"Email verification"} />
			<section className="pageSection">
				{isSent ? (
					<div className="flex flex-col items-center justify-center p-4 rounded mx-auto w-full min-h-[10.5rem] max-w-xl bg-lightDarkColor">
						<span className="text-6xl mx-auto text-green-400 mb-5">
							<FaCheckCircle />
						</span>

						<p className="text-whiteColor/50 text-center text-clip max-w-[70%]">
							Email sent, check your inbox
						</p>
					</div>
				) : (
					<div className="p-4 rounded mx-auto w-full min-h-[10.5rem] max-w-xl bg-lightDarkColor">
						<h1 className="text-xl font-bold text-center">
							Verify email
						</h1>
						<p className="text-whiteColor/50 text-clip text-center mx-auto max-w-[70%]">
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Assumenda corporis beatae quas expedita.
						</p>

						<ButtonWithLoading
							className="secondaryBtn mt-4 mx-auto"
							BtnIcon={<FaPaperPlane />}
							btntext={"Send email verification link"}
							isLoading={authLoading.sendEmailLink}
							loadingText={"Sending"}
							onClickHandler={sendLinkHandler}
						/>
					</div>
				)}
			</section>
		</Fragment>
	);
};

export default EmailVerificationPage;

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
