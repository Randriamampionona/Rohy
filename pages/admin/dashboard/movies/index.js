import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";
import { FaEdit, FaPlusCircle, FaTrash, FaVideoSlash } from "react-icons/fa";
import {
	MetaHead,
	SearchSection,
	TablePagination,
	TopSection,
} from "../../../../components/Common";
import { DashboardHOC } from "../../../../components/HOC";
import axiosHeadersHandler from "../../../../utils/axiosHeadersHandler";
import getCurrentUserProps from "./../../../../utils/getCurrentUserProps";

const MoviesDashboardPage = ({ moviesData, table_page }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage movies"} />
			<section className="w-full h-full">
				<TopSection
					title={"Movies"}
					btnName={"movie"}
					Navigatelink={"/admin/dashboard/movies/add"}
				/>

				<main className="w-full">
					<SearchSection
						count={moviesData?.total_data || 0}
						selectionName={"Category"}
						placeholder={"movies"}
						selectOptions={[
							{
								key: 548148691,
								name: "All channels",
							},
							{
								key: 9897187191,
								name: "Sport",
							},
							{
								key: 35897156,
								name: "Cinema",
							},
							{
								key: 3156881,
								name: "Youth",
							},
							{
								key: 9715456,
								name: "Info",
							},
							{
								key: 16587981475,
								name: "Series",
							},
							{
								key: 3575687,
								name: "Documentaries",
							},
							{
								key: 12487155,
								name: "Entertainment",
							},
							{
								key: 3558755,
								name: "Music",
							},
							{
								key: 576145,
								name: "Adult",
							},
						]}
					/>

					<MovieTable
						data={moviesData?.results || []}
						table_page={moviesData?.page || 1}
						tableFields={[
							{
								id: 1,
								name: "No.",
							},
							{
								id: 2,
								name: "Title",
							},
							{
								id: 3,
								name: "ID",
							},
							{
								id: 4,
								name: "Category",
							},
							{
								id: 5,
								name: "Author",
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
						count={moviesData?.results.length || 1}
						table_page={moviesData?.page || 1}
						total_page={moviesData?.total_page || 1}
						paginationBaseLink={"/admin/dashboard/movies"}
					/>
				</main>
			</section>
		</Fragment>
	);
};

const MovieTable = ({ tableFields, data, table_page }) => {
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
									href={`/admin/dashboard/movies/${r.category.id}__${r.id}`}>
									<a className="text-primaryColor hover:underline">
										{r.title}
									</a>
								</Link>
							</td>
							<td className="px-2 py-4 text-start">{r.id}</td>
							<td className="px-2 py-4 text-start">
								{r.category.name}
							</td>
							<td className="px-2 py-4 text-start italic">
								{r.postBy}
							</td>
							<td className="px-2 py-4 text-start">
								<p>Posted on</p>
								<p className="text-lightDarkColor/60">
									{new Date(r.createdAt).toLocaleString()}
								</p>
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
					<FaVideoSlash size={75} color="rgb(24 23 31 / 0.1)" />

					<div className="flex flex-col items-center justify-center  mt-10">
						<h1 className="font-medium text-center">
							Not enough movies
						</h1>
						<p className="max-w-xs text-center">
							Looks like the movies database hasn&apos;t that much
							data!😟
						</p>

						<button
							className="primaryBtn shadow-btnShadow mt-4"
							onClick={() => push("/admin/dashboard/movies/add")}>
							<span>
								<FaPlusCircle />
							</span>
							<span>Add new movie</span>
						</button>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default DashboardHOC(MoviesDashboardPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// call get movies API
		const URL = "/v1/admin/movies";
		const fetch = await axios.get(
			URL,
			axiosHeadersHandler(ctx, { table_page: ctx.query.table_page || 1 })
		);
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					table_page: ctx.query.table_page || 1,
					moviesData: result.payload,
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
