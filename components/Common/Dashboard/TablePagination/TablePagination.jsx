import { useRouter } from "next/router";
import React from "react";

const TablePagination = ({
	count,
	table_page,
	total_page,
	paginationBaseLink,
}) => {
	const { push } = useRouter();

	const clickHandler = (key) => {
		switch (key) {
			case "prev":
				push(`${paginationBaseLink}?table_page=${+table_page - 1}`);
				break;

			case "next":
				push(`${paginationBaseLink}?table_page=${+table_page + 1}`);
				break;

			default:
				break;
		}
	};

	return (
		<div className="flex items-center justify-end space-x-4">
			<p className="text-sm">{count} elements</p>

			<div className="flex items-center justify-center space-x-2">
				<button
					disabled={table_page <= 1}
					className="px-2 py-1 rounded-sm text-sm bg-whiteColor border border-lightDarkColor/25"
					onClick={(_) => clickHandler("prev")}>
					<span>prev</span>
				</button>
				<p className="text-sm">
					{table_page} of {total_page}
				</p>
				<button
					disabled={table_page >= total_page}
					className="px-2 py-1 rounded-sm text-sm bg-whiteColor border border-lightDarkColor/25"
					onClick={(_) => clickHandler("next")}>
					<span>next</span>
				</button>
			</div>
		</div>
	);
};

export default TablePagination;
