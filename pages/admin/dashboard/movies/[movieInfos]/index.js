import axios from "axios";
import { Fragment } from "react";
import { MetaHead } from "../../../../../components/Common";
import { DashboardHOC } from "../../../../../components/HOC";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../../utils/axiosHeadersHandler";

const SingleMovieDashboardPage = ({ singleMovieData }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage movies"} />

			<section className="w-full h-full">
				<pre>{JSON.stringify(singleMovieData, null, 2)}</pre>
			</section>
		</Fragment>
	);
};

export default DashboardHOC(SingleMovieDashboardPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// call get single movie API
		const URL = `/v1/admin/movies/${ctx.params.movieInfos}`;
		const fetch = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					singleMovieData: result.payload,
				},
			};
		}
	} catch (error) {
		return {
			props: {
				...user,
			},
		};
	}
};
