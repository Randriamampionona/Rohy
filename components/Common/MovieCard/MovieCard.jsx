import Image from "next/image";
import logo from "../../../public/assets/logo-with-rose-color.webp";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/router";

const MovieCard = ({ movie, displayBottom }) => {
	const { push } = useRouter();

	const navigatehandler = (videoID) => {
		push(`/watch/${videoID}`);
	};

	return (
		<div className="relative w-full h-auto space-y-3">
			{/* videos */}
			<div
				className="relative w-full h-32 bg-lightDarkColor/30 shadow shadow-darkColor rounded overflow-hidden"
				onClick={() => navigatehandler(movie.id)}>
				<Image
					src={
						movie?.backdrop_path
							? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
							: `https://image.tmdb.org/t/p/original${movie?.poster_path}`
					}
					alt={movie.title}
					layout="fill"
					objectFit="cover"
					placeholder="blur"
					blurDataURL={
						movie?.backdrop_path
							? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`
							: `https://image.tmdb.org/t/p/original${movie?.poster_path}`
					}
					className="hover:scale-110 transition-all"
				/>

				{/* logo */}
				<figure className="z-10 absolute bottom-2 left-2">
					<Image
						src={logo}
						alt={movie.title}
						width={42}
						height={25}
						placeholder="blur"
						blurDataURL={logo}
						objectFit="cover"
					/>
				</figure>
			</div>

			{/* infos */}
			<div className="flex items-start justify-between">
				<div className="flex-grow flex-shrink">
					<h1 className="text-whiteColor text-base font-medium">
						{movie.title}
					</h1>
					<p className="text-whiteColor/60 text-sm font-normal">
						{movie[displayBottom]}
					</p>
				</div>

				<button
					className="p-2 rounded text-whiteColor text-xs border-0 outline-0 bg-lightDarkColor hover:bg-whiteColor/10"
					onClick={() => navigatehandler(movie.id)}>
					<span>
						<FaPlay />
					</span>
				</button>
			</div>
		</div>
	);
};

export default MovieCard;
