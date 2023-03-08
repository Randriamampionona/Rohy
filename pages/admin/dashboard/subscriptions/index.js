import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";
import {
	MetaHead,
	SearchSection,
	TablePagination,
	TopSection,
} from "../../../../components/Common";
import { DashboardHOC } from "../../../../components/HOC";
import getCurrentUserProps from "./../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../utils/axiosHeadersHandler";
import { RiRssFill } from "react-icons/ri";

const SubscriptionsDashboardPage = ({ subscriptionsData }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage subscriptions"} />

			<TopSection title={"Subscriptions"} />

			<section className="w-full h-full">
				<main className="w-full">
					<SearchSection
						count={subscriptionsData?.total_data || 0}
						selectionName={"Status"}
						placeholder={"subscription"}
						selectOptions={[
							{ key: 1, name: "active" },
							{ key: 2, name: "canceled" },
							{ key: 3, name: "expired" },
						]}
					/>

					<SubscriptionTable
						data={subscriptionsData?.results || []}
						table_page={subscriptionsData?.page || 1}
						tableFields={[
							{
								id: 1,
								name: "No.",
							},
							{
								id: 2,
								name: "ID",
							},
							{
								id: 3,
								name: "Status",
							},
							{
								id: 4,
								name: "Plan",
							},
							{
								id: 5,
								name: "Owner",
							},
							{
								id: 6,
								name: "Start at",
							},
							{
								id: 7,
								name: "End at",
							},
						]}
					/>

					<TablePagination
						count={subscriptionsData?.results.length || 1}
						table_page={subscriptionsData?.page || 1}
						total_page={subscriptionsData?.total_page || 1}
						paginationBaseLink={"/admin/dashboard/subscriptions"}
					/>
				</main>
			</section>
		</Fragment>
	);
};

const SubscriptionTable = ({ tableFields, data, table_page }) => {
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
									href={`/admin/dashboard/subscriptions/${r.subscription_ID}`}>
									<a className="text-primaryColor hover:underline">
										{r.subscription_ID}
									</a>
								</Link>
							</td>
							<td className="px-2 py-4 text-start">
								<div
									title={r.status.text}
									className={`w-4 h-4 rounded-full cursor-default ${
										r.status.code === 1
											? "bg-green-500"
											: r.status.code === 2
											? "bg-red-500"
											: "bg-gray-500"
									}`}
								/>
							</td>
							<td className="px-2 py-4 text-start uppercase">
								{r.plan.name}
							</td>
							<td className="px-2 py-4 text-start italic">
								<Link
									href={`/admin/dashboard/users/${r.owner}`}>
									<a className="text-primaryColor hover:underline">
										{r.owner}
									</a>
								</Link>
							</td>
							<td className="px-2 py-4 text-start">{r.start}</td>
							<td className="px-2 py-4 text-start">{r.end}</td>
						</tr>
					))}
				</tbody>
			</table>

			{!data?.length && (
				<div className="flex flex-col items-center justify-center w-full py-16 mx-auto border border-t-0 border-lightDarkColor/10 mb-3">
					<RiRssFill size={75} color="rgb(24 23 31 / 0.1)" />

					<div className="flex flex-col items-center justify-center  mt-10">
						<h1 className="font-medium text-center">
							Not enough subscriptions
						</h1>
						<p className="max-w-xs text-center">
							Looks like the subscriptions database hasn&apos;t
							that much data!😟
						</p>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default DashboardHOC(SubscriptionsDashboardPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		const URL = "v1/admin/sub/";
		const fetch = await axios.get(
			URL,
			axiosHeadersHandler(ctx, { table_page: ctx.query?.table_page || 1 })
		);
		const result = fetch.data;

		return {
			props: {
				...user,
				subscriptionsData: result.payload,
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
