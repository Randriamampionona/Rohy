import { Fragment } from "react";
import { Widget } from "../../Common";
import Image from "next/image";
import logo from "../../../public/assets/logo-with-rose-color.webp";
import { useRouter } from "next/router";

const Category = ({ categoryDetails, moviesList }) => {
	const overlay = "bottomOverlay after:h-[7rem]";

	return (
		<div className="grid grid-cols-2 grid-rows-[repeat(5,11rem)] gap-4 md:grid-cols-3 md:grid-rows-[repeat(3,11rem)] lg:grid-cols-4">
			<div className="row-[1/3] col-[1/3] bg-lightDarkColor rounded-sm md:col-auto md:row-[1/3] lg:row-[1/3]">
				<Widget {...categoryDetails} />
			</div>
			<div
				className={`relative group overflow-hidden bg-lightDarkColor rounded-sm md:row-auto lg:row-auto ${overlay}`}>
				<Movie
					// img={moviesList[0].poster_path}
					img={moviesList[0].poster_path}
					alt={moviesList[0]?.title}
					title={moviesList[0]?.title}
					videoID={moviesList[0]?.id}
				/>
			</div>
			<div
				className={`relative group overflow-hidden row-[2/4] bg-lightDarkColor rounded-sm md:row-[1/3] md:col-[3/4] lg:row-[1/3] ${overlay}`}>
				<Movie
					// img={moviesList[1].poster_path}
					img={moviesList[1].poster_path}
					alt={moviesList[1]?.title}
					title={moviesList[1]?.title}
					videoID={moviesList[1]?.id}
				/>
			</div>
			<div
				className={`relative group overflow-hidden bg-lightDarkColor rounded-sm md:row-[2/4] lg:row-auto ${overlay}`}>
				<Movie
					// img={moviesList[2].poster_path}
					img={moviesList[2].poster_path}
					alt={moviesList[2]?.title}
					title={moviesList[2]?.title}
					videoID={moviesList[2]?.id}
				/>
			</div>
			<div
				className={`relative group overflow-hidden row-[4/6] bg-lightDarkColor rounded-sm md:row-auto lg:row-[2/4] ${overlay}`}>
				<Movie
					// img={moviesList[3].poster_path}
					img={moviesList[3].poster_path}
					alt={moviesList[3]?.title}
					title={moviesList[3]?.title}
					videoID={moviesList[3]?.id}
				/>
			</div>
			<div
				className={`relative group overflow-hidden row-[3/5] bg-lightDarkColor rounded-sm md:row-auto lg:row-[2/4] ${overlay}`}>
				<Movie
					// img={moviesList[4].poster_path}
					img={moviesList[4].poster_path}
					alt={moviesList[4]?.title}
					title={moviesList[4]?.title}
					videoID={moviesList[4]?.id}
				/>
			</div>
			<div
				className={`relative group overflow-hidden row-[5/7] bg-lightDarkColor rounded-sm md:hidden lg:block lg:row-auto ${overlay}`}>
				<Movie
					// img={moviesList[5].poster_path}
					img={moviesList[5].poster_path}
					alt={moviesList[5]?.title}
					title={moviesList[5]?.title}
					videoID={moviesList[5]?.id}
				/>
			</div>
			<div
				className={`relative group overflow-hidden bg-lightDarkColor rounded-sm md:hidden lg:block lg:row-auto ${overlay}`}>
				<Movie
					// img={moviesList[6].poster_path}
					img={moviesList[6].poster_path}
					alt={moviesList[6]?.title}
					title={moviesList[6]?.title}
					videoID={moviesList[6]?.id}
				/>
			</div>
		</div>
	);
};

export default Category;

const Movie = ({ img, alt, title, videoID }) => {
	const { push } = useRouter();

	const navigatehandler = () => {
		push(`/watch/${videoID}`);
	};

	return (
		<Fragment>
			<div
				className="relative w-full h-full active:scale-95"
				onClick={navigatehandler}>
				<Image
					src={`https://image.tmdb.org/t/p/original${img}`}
					alt={alt}
					layout="fill"
					objectFit="cover"
					className="group-hover:scale-110 transition-all"
				/>
			</div>
			<div className="z-10 absolute flex items-center gap-x-4 bottom-2 w-full px-4">
				<Image
					src={logo}
					alt={title}
					width={42}
					height={25}
					placeholder="blur"
					blurDataURL={logo}
					objectFit="cover"
				/>

				<h1 className="flex-grow text-base font-bold uppercase italic">
					{title}
				</h1>
			</div>
		</Fragment>
	);
};
