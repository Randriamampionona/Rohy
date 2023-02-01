import Link from "next/link";
import { Fragment } from "react";
import { MetaHead } from "../../components/Common";
import { AuthContext } from "../../store/context/AuthContext";
import getCurrentUserProps from "../../utils/getCurrentUserProps";
import { RiDashboardFill } from "react-icons/ri";

const AdminPage = () => {
	const { currentUser } = AuthContext();

	return (
		<Fragment>
			<MetaHead
				subTitle={
					"Welcome to the admin section where you can edit - update - delete stuff you want"
				}
			/>
			<section className="pageSection">
				<div className="flex flex-col items-center justify-center mx-auto mt-24 text-center">
					<RiDashboardFill size={75} color="#18171f" />
					<h2 className="mt-8">Hi, {currentUser?.displayName} 👋</h2>
					<h1 className="uppercase text-3xl font-bold">
						Welcome to the admin section
					</h1>
					<p className="max-w-[80%] text-whiteColor/70">
						A place where you can edit - update - delete stuff you
						want
					</p>
					<Link href={"/admin/dashboard?key=5641898"}>
						<a className="underline text-primaryColor mt-4">
							continue to dashboard
						</a>
					</Link>
				</div>
			</section>
		</Fragment>
	);
};

export default AdminPage;

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
