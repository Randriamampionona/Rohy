import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";
import { FaEdit, FaPlusCircle, FaTicketAlt, FaTrash } from "react-icons/fa";
import {
	MetaHead,
	SearchSection,
	TablePagination,
	TopSection,
} from "../../../../components/Common";
import { DashboardHOC } from "../../../../components/HOC";
import getCurrentUserProps from "./../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../utils/axiosHeadersHandler";

const OffersDashboardPage = ({ offersData }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage offers"} />

			<TopSection
				title={"Offers"}
				btnName={"offer"}
				Navigatelink={"/admin/dashboard/offers/add"}
			/>

			<main className="w-full">
				<SearchSection
					count={offersData?.total_data || 0}
					selectionName={"Offer"}
					placeholder={"offers"}
					selectOptions={[
						{
							key: 6048415,
							name: "Basic",
						},
						{
							key: 98715,
							name: "Standard",
						},
						{
							key: 32141,
							name: "Premium",
						},
					]}
				/>

				<OfferTable
					table_page={offersData?.page || 1}
					data={offersData?.results || []}
					tableFields={[
						{
							id: 1,
							name: "No.",
						},
						{
							id: 2,
							name: "Name",
						},
						{
							id: 3,
							name: "ID",
						},
						{
							id: 4,
							name: "Price",
						},
						{
							id: 6,
							name: "Date",
						},
						{
							id: 7,
							name: "Actions",
						},
					]}
				/>

				<TablePagination
					count={offersData?.results.length || 1}
					table_page={offersData?.page || 1}
					total_page={offersData?.total_page || 1}
					paginationBaseLink={"/admin/dashboard/offers"}
				/>
			</main>
		</Fragment>
	);
};

const OfferTable = ({ tableFields, data, table_page }) => {
	return (
		<Fragment>
			<table className="min-w-full w-full overflow-x-auto border border-lightDarkColor/10 mb-3">
				<thead className="bg-whiteColor border-b border-lightDarkColor/10">
					<tr>
						{tableFields?.map((field) => (
							<th key={field.id} className="text-start px-2 py-3">
								{field.name}
							</th>
						))}
					</tr>
				</thead>

				<tbody className="text-lightDarkColor">
					{data?.map((r, i) => (
						<tr key={i} className="even:bg-whiteColor">
							<th scope="row" className="px-2 py-4 text-start">
								{table_page == 1
									? i + 1
									: i + 1 + table_page * 10}
							</th>
							<td className="px-2 py-4 text-start">
								<Link
									href={`/admin/dashboard/offers/${r.planID}`}>
									<a className="text-primaryColor hover:underline">
										{r.name}
									</a>
								</Link>
							</td>
							<td className="px-2 py-4 text-start">{r.planID}</td>
							<td className="px-2 py-4 text-start">
								{r.price.regular} Ar
							</td>
							<td className="px-2 py-4 text-start italic">
								{r.dateCreated}
							</td>

							{/* actions */}
							<td className="px-2 py-4 text-start">
								<div className="flex items-center space-x-2">
									<button className="primaryBtn bg-red-500 hover:bg-red-600 px-3 h-8">
										<span>
											<FaTrash />
										</span>
										<span>Delete</span>
									</button>
									<button className="primaryBtn bg-teal-500 hover:bg-teal-600 px-3 h-8">
										<span>
											<FaEdit />
										</span>
										<span>Edit</span>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{!data?.length && (
				<div className="flex flex-col items-center justify-center w-full py-16 mx-auto border border-t-0 border-lightDarkColor/10 mb-3">
					<FaTicketAlt size={75} color="rgb(24 23 31 / 0.1)" />

					<div className="flex flex-col items-center justify-center  mt-10">
						<h1 className="font-medium text-center">
							Not enough offers
						</h1>
						<p className="max-w-xs text-center">
							Looks like the offers database hasn&apos;t that much
							data!😟
						</p>

						<button
							className="primaryBtn shadow-btnShadow mt-4"
							onClick={() => push("/admin/dashboard/offers/add")}>
							<span>
								<FaPlusCircle />
							</span>
							<span>Add new offer</span>
						</button>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default DashboardHOC(OffersDashboardPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get all plans
		const URL = "/v1/admin/offers";
		const fetch = await axios.get(
			URL,
			axiosHeadersHandler(ctx, { table_page: ctx.query?.table_page || 1 })
		);
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					offersData: result.payload,
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
