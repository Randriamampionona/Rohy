import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchSection = ({
	count,
	placeholder,
	selectOptions,
	selectionName,
}) => {
	return (
		<div className="flex items-center justify-between w-full mb-8">
			<p className="text-sm">
				<span className="font-semibold">All </span>
				<span className="text-lightDarkColor/75">({count})</span>
			</p>

			<form className="flex items-center justify-end space-x-2 w-auto h-9">
				<div className="flex items-center min-w-[9.5rem] h-full px-2 border border-lightDarkColor/25 rounded focus-within:border-primaryColor">
					<div className="flex items-center">
						<span className="text-lightDarkColor/75">
							<FiSearch />
						</span>
						<input
							type="text"
							placeholder={`Search ${placeholder}...`}
							className="outline-none border-0 px-3 bg-transparent"
						/>
					</div>

					<select className="outline-none border-0 bg-transparent border-l border-lightDarkColor/25">
						<option value="default">{selectionName}</option>
						{selectOptions.map((opt) => (
							<option key={opt.key} value={opt.key}>
								{opt.name}
							</option>
						))}
					</select>
				</div>

				<button className="primaryBtn px-3 h-full">
					<span>
						<FiSearch />
					</span>
					<span>Search</span>
				</button>
			</form>
		</div>
	);
};

export default SearchSection;
