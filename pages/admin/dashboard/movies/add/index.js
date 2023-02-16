import { Fragment } from "react";
import { MetaHead, MovieForm } from "../../../../../components/Common";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import DashboardHOC from "./../../../../../components/HOC/Dashboard.HOC";

const AddMoviePage = () => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage movies"} />

			<section className="w-full h-full">
				<h1 className="text-center text-xl uppercase font-medium mb-8">
					Add new movie
				</h1>
				<MovieForm />
			</section>
		</Fragment>
	);
};

export default DashboardHOC(AddMoviePage);

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
