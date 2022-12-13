const Intro = () => {
	return (
		<div className="relative flex items-end w-full h-[calc(100vh-10rem)] bg-homeIntroBg bg-no-repeat bg-cover bg-darkColor after:z-[1] after:absolute after:bottom-0 after:w-full after:h-[18rem] after:bg-gradient-to-b after:from-transparent after:to-darkColor">
			<div className="z-10 flex items-end justify-between w-full p-4 md:p-8 lg:p-10 xl:p-16">
				<div className="space-y-2">
					<h1 className="max-w-[25rem] text-3xl text-whiteColor font-extrabold italic leading-none uppercase lg:text-4xl lg:max-w-[35rem]">
						NE CHERCHEZ PAS, VOUS NE TROUVEREZ PAS + AILLEURS
					</h1>
					<p className="text-whiteColor/70 text-sm lg:text-base">
						Regardez le meilleur des séries, des films et du sport
						en streaming et en illimité.
					</p>
					<button className="primaryBtn uppercase">
						<span>Decouvrir now offres</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Intro;
