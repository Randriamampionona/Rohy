import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const ButtonSection = ({ navigateLink, deleteHandler, loading }) => {
	const { push } = useRouter();

	const navigateHandler = () => push(navigateLink);

	return (
		<div className="flex items-center space-x-2 w-full mt-8">
			<button
				className="primaryBtn bg-red-500 hover:bg-red-600"
				onClick={deleteHandler}>
				{loading ? (
					<>
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
						<span>Loading...</span>
					</>
				) : (
					<>
						<span>
							<FaTrash />
						</span>
						<span>Delete</span>
					</>
				)}
			</button>

			<button
				className="primaryBtn bg-teal-500 hover:bg-teal-600"
				onClick={navigateHandler}>
				<span>
					<FaEdit />
				</span>
				<span>Edit</span>
			</button>
		</div>
	);
};

export default ButtonSection;
