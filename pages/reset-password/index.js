import { Fragment } from "react";
import { MetaHead, ResetPasswordForm } from "../../components/Common";
import getCurrentUserProps from "../../utils/getCurrentUserProps";

const ResetPasswordPage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Reset password"} />
			<section className="pageSection flex items-center justify-center my-20">
				<div className="w-full rounded bg-lightDarkColor p-4 md:w-[45%] lg:w-[35%]">
					<ResetPasswordForm />
				</div>
			</section>
		</Fragment>
	);
};

export default ResetPasswordPage;

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	return {
		props: {
			...user,
		},
	};
};
