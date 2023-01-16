import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import MetaHead from "../MetaHead/MetaHead";
import { GlobalContext } from "../../../store/context/GlobalContext";

const Error = () => {
	const { error } = GlobalContext();
	const { replace } = useRouter();

	return (
		<Fragment>
			<MetaHead subTitle={"Ooooop! Something went wrong"} />

			<section className="pageSection flex items-center justify-center w-full h-screen">
				<main className="w-72 flex flex-col items-center justify-center bg-lightDarkColor p-4 rounded border-b border-red-600 md:80 xl:w-96">
					<h1 className="text-2xl font-bold text-center">
						Oooooop! Something went wrong
					</h1>
					<p className="text-center">({error.data.message})</p>
					<code className="text-center text-whiteColor/70 mt-4">
						{error.status}:{" "}
						{error.statusText?.toLowerCase().replaceAll(" ", "_")}
					</code>

					<button
						className="outlineBtn mt-8"
						onClick={(_) => replace(error.data.rdc)}>
						<span>
							<FaArrowLeft />
						</span>
						<span>Take me to a safety place</span>
					</button>
				</main>
			</section>
		</Fragment>
	);
};

export default Error;
