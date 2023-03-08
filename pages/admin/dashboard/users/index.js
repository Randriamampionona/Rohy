import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Avatar from "react-avatar";
import {
	FaEdit,
	FaPlusCircle,
	FaUserAltSlash,
	FaUserCheck,
	FaUserLock,
} from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import {
	MetaHead,
	SearchSection,
	TablePagination,
	TopSection,
} from "../../../../components/Common";
import { DashboardHOC } from "../../../../components/HOC";
import { useUsers } from "../../../../hooks";
import { AuthContext } from "../../../../store/context/AuthContext";
import getCurrentUserProps from "../../../../utils/getCurrentUserProps";
import axiosHeadersHandler from "./../../../../utils/axiosHeadersHandler";

const UsersDashboardPage = ({ usersList }) => {
	return (
		<Fragment>
			<MetaHead subTitle={"Manage users"} />

			<TopSection
				title={"Users"}
				btnName={"user"}
				Navigatelink={"/admin/dashboard/users/add"}
			/>

			<main className="w-full">
				<SearchSection
					count={usersList?.total_data || 0}
					selectionName={"User"}
					placeholder={"users"}
					selectOptions={[
						{
							key: 6048415,
							name: "Email",
						},
						{
							key: 98715,
							name: "Username",
						},
						{
							key: 32141,
							name: "UID",
						},
					]}
				/>

				<UserTable
					table_page={usersList?.page || 1}
					data={usersList?.results || []}
					tableFields={[
						{
							id: 1,
							name: "No.",
						},
						{
							id: 2,
							name: "UID",
						},
						{
							id: 3,
							name: "Username",
						},
						{
							id: 4,
							name: "Email",
						},
						{
							id: 5,
							name: "Role",
						},
						{
							id: 6,
							name: "Joinded on",
						},
						{
							id: 7,
							name: "Profile",
						},
						{
							id: 8,
							name: "Actions",
						},
					]}
				/>

				{usersList?.results.length && (
					<TablePagination
						count={usersList?.results.length || 0}
						table_page={usersList?.page || 1}
						total_page={usersList?.total_page || 1}
						paginationBaseLink={"/admin/dashboard/users"}
					/>
				)}
			</main>
		</Fragment>
	);
};

const UserTable = ({ tableFields, data, table_page }) => {
	const { currentUser } = AuthContext();
	const { loading, disabledFunc } = useUsers();
	const { push } = useRouter();

	const disableHandler = async (id, disabled) => {
		await disabledFunc(id, { disabled: !disabled }, "disabled");
	};

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
								<Link href={`/admin/dashboard/users/${r.uid}`}>
									<a className="text-primaryColor hover:underline">
										{r.uid.substring(0, 12)}...
									</a>
								</Link>
							</td>
							<td className="px-2 py-4 text-start">
								{r.displayName}
							</td>
							<td className="px-2 py-4 text-start">{r.email}</td>
							<td className="px-2 py-4 text-start italic">
								{r.role == "admin" ||
								r.role == "super admin" ? (
									<span className="text-xs font-bold uppercase px-2 py-[2px] bg-yellow-600 text-darkColor rounded shadow-btnShadow cursor-default select-none">
										{r.role}
									</span>
								) : (
									<span>-- --</span>
								)}
							</td>
							<td className="px-2 py-4 text-start italic">
								{r.joinedOn}
							</td>
							<td className="px-2 py-4 text-start italic">
								<Avatar
									src={r.photoURL}
									name={r?.displayName}
									round={true}
									size={25}
									email={r?.displayName}
									className="cursor-pointer hover:opacity-90"
								/>
							</td>

							{/* actions */}
							{currentUser?.role !== "super admin" ? (
								<td className="px-2 py-4 text-start">
									<span className="text-sm text-center text-red-500 mx-auto mt-6">
										You don&apos;t have permission to
										perform an action
									</span>
								</td>
							) : (
								<td className="px-2 py-4 text-start">
									<div className="flex items-center space-x-2">
										<button
											className="primaryBtn bg-red-500 hover:bg-red-600 px-3 h-8"
											disabled={
												!!loading.disabled &&
												loading.disabled.id === r.uid
											}
											onClick={() =>
												disableHandler(
													r.uid,
													r.disabled
												)
											}>
											{!!loading.disabled &&
											loading.disabled.id === r.uid ? (
												<>
													<span className="animate-spin">
														<ImSpinner2 />
													</span>
													<span>Loading...</span>
												</>
											) : (
												<>
													<span>
														{r.disabled ? (
															<FaUserCheck />
														) : (
															<FaUserLock />
														)}
													</span>
													<span>
														{r.disabled
															? "Unable"
															: "Disable"}
													</span>
												</>
											)}
										</button>

										<button
											className="primaryBtn bg-teal-500 hover:bg-teal-600 px-3 h-8"
											onClick={(_) =>
												push(
													`/admin/dashboard/users/edit/${r.uid}`
												)
											}>
											<span>
												<FaEdit />
											</span>
											<span>Edit</span>
										</button>
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>

			{!data?.length && (
				<div className="flex flex-col items-center justify-center w-full py-16 mx-auto border border-t-0 border-lightDarkColor/10 mb-3">
					<FaUserAltSlash size={75} color="rgb(24 23 31 / 0.1)" />

					<div className="flex flex-col items-center justify-center  mt-10">
						<h1 className="font-medium text-center">
							Not enough users
						</h1>
						<p className="max-w-xs text-center">
							Looks like the users database hasn&apos;t that much
							data!😟
						</p>

						<button
							className="primaryBtn shadow-btnShadow mt-4"
							onClick={() => push("/admin/dashboard/users/add")}>
							<span>
								<FaPlusCircle />
							</span>
							<span>Add new user</span>
						</button>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default DashboardHOC(UsersDashboardPage);

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// get all users
		const URL = "/v1/admin/users";
		const fetch = await axios.get(
			URL,
			axiosHeadersHandler(ctx, { table_page: ctx.query?.table_page || 1 })
		);
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					usersList: result.payload,
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
