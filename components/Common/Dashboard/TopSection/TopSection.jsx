import { useRouter } from "next/router";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const TopSection = ({ title, btnName, Navigatelink }) => {
	const { push } = useRouter();

	const clickHandler = () => push(Navigatelink);

	return (
		<div className="flex items-center space-x-4 mb-8">
			<h4 className="text-lg font-medium">{title}</h4>
			{btnName && Navigatelink && (
				<button
					className="secondaryBtn shadow-btnShadow"
					onClick={clickHandler}>
					<span>
						<FaPlusCircle />
					</span>
					<span>Add new {btnName}</span>
				</button>
			)}
		</div>
	);
};

export default TopSection;
