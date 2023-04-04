import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import MetaHead from "../MetaHead/MetaHead";

const Error = ({ error, navigateLink }) => {
	const { replace } = useRouter();

	const navigateHandler = () => {
		return replace(navigateLink);
	};

	console.log(error);

	return (
		<Fragment>
			<MetaHead subTitle={"Ooooop! Something went wrong"} />

			<section className="pageSection flex items-center justify-center w-full h-screen">
				<main className="w-72 flex flex-col items-center justify-center bg-lightDarkColor p-4 rounded border-b-2 border-red-600 md:80 xl:w-96">
					<h1 className="text-2xl font-bold text-center">
						Oooooop! Something went wrong
					</h1>
					<p className="text-center">
						({" "}
						{error?.response?.data?.message ||
							error.message ||
							error}{" "}
						)
					</p>

					<button
						className="secondaryBtn mt-8"
						onClick={navigateHandler}>
						<span>
							<FaArrowLeft />
						</span>
						<span>Go back</span>
					</button>
				</main>
			</section>
		</Fragment>
	);
};

export default Error;
