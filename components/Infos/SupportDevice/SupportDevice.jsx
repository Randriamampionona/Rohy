import Image from "next/image";
import device from "../../../public/assets/device.webp";
import { FaDownload } from "react-icons/fa";

const SupportDevice = () => {
	return (
		<main className="relative flex flex-col items-center justify-center gap-y-4 py-10 px-4">
			<h1 className="text-center text-3xl font-bold uppercase">
				Disponible sur tout support
			</h1>

			<p className="text-center text-base max-w-[95%] md:max-w-[85%] lg:max-w-[75%]">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
				laudantium minima tenetur, veniam, modi dolore architecto
				repellendus deleniti perferendis error illum! Ea similique quam
				amet suscipit, eum deleniti alias voluptatibus, sapiente sed
				dolores aspernatur expedita excepturi pariatur temporibus
				asperiores saepe, dolorum accusantium veritatis molestiae
				deserunt enim? Fugit pariatur at beatae fuga nesciunt eos
				dolores placeat minima incidunt fugiat deserunt aliquam
				reiciendis recusandae sequi quasi cum culpa iste et, perferendis
				delectus.
			</p>

			<div>
				<Image
					src={device}
					alt={device}
					placeholder="blur"
					style={{ objectFit: "cover" }}
				/>
			</div>

			<button
				className="primaryBtn uppercase">
				<span>telecharger</span>
				<span>
					<FaDownload />
				</span>
			</button>
		</main>
	);
};

export default SupportDevice;
