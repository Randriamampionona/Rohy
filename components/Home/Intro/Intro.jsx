import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Intro = () => {
	const [introImg, setIntroImg] = useState(null);
	const { push } = useRouter();

	useEffect(() => {
		const getImage = async () => {
			const URL =
				"https://api.themoviedb.org/3/movie/upcoming?api_key=21ad01e70707b8167d893fa104cf05cb&language=en-US&page=1";
			const fetch = await axios.get(URL);
			const data = fetch?.data;
			const img =
				data?.results[Math.floor(Math.random() * data?.results?.length)]
					?.poster_path;
			const patch = `url(https://image.tmdb.org/t/p/original${img})`;

			setIntroImg(patch || "url('/assets/intro2.jfif')");
		};

		!introImg && getImage();
	}, [introImg]);

	return (
		<div
			className={`relative flex items-end w-full h-[calc(100vh-10rem)] bg-no-repeat bg-cover bg-darkColor bottomOverlay after:h-[18rem] after:to-darkColor`}
			style={{ backgroundImage: introImg }}>
			<div className="z-10 flex items-end justify-between w-full p-4 md:p-8 lg:p-10 xl:p-16">
				<div className="space-y-2">
					<h1 className="max-w-[25rem] text-3xl text-whiteColor font-extrabold italic leading-none uppercase lg:text-4xl lg:max-w-[35rem]">
						NE CHERCHEZ PAS, VOUS NE TROUVEREZ PAS + AILLEURS
					</h1>
					<p className="text-whiteColor/70 text-sm lg:text-base">
						Regardez le meilleur des séries, des films et du sport
						en streaming et en illimité.
					</p>
					<button
						className="primaryBtn uppercase"
						onClick={(_) => push("/offers")}>
						<span>Decouvrir nos offres</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Intro;
