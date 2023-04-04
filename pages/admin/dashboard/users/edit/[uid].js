import { Fragment } from "react";
import { MetaHead, UserForm } from "../../../../../components/Common";
import getCurrentUserProps from "../../../../../utils/getCurrentUserProps";
import DashboardHOC from "../../../../../components/HOC/Dashboard.HOC";
import axios from "axios";
import axiosHeadersHandler from "./../../../../../utils/axiosHeadersHandler";

const EditUserPage = ({ currentValues }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage offers"} />

			<section className="w-full h-full">
				<h1 className="text-center text-xl uppercase font-medium mb-8">
					Update user
				</h1>
				<UserForm currentValues={currentValues} />
			</section>
		</Fragment>
	);
};

export default DashboardHOC(EditUserPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get current data
		const URL = `/v1/admin/users/${ctx.params.uid}`;
		const fetch = await axios.get(URL, axiosHeadersHandler(ctx));
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					currentValues: {
						initValues: {
							displayName: result.payload.displayName,
							email: result.payload.email,
							password: "*********",
							role: result.payload.role,
						},

						initFiles: {
							photoURL: {
								fileName: result.payload.photoURL,
								base64: result.payload.photoURL,
								process: null,
							},
						},
					},
				},
			};
		}
	} catch (error) {
		return {
			props: {
				...user,
				error,
			},
		};
	}
};
