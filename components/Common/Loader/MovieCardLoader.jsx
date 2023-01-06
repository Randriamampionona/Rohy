const MovieCardLoader = ({ showPlayBtn = true }) => {
	return (
		<div className="relative w-full h-auto space-y-3">
			<div className="group relative w-full h-32 bg-lightDarkColor/30 rounded overflow-hidden loaderAnimate" />

			<div className="flex items-start justify-between">
				<div className="flex-grow flex-shrink">
					<div className="w-[75%] h-3 mb-1 loaderAnimate" />
					<div className="w-[55%] h-3 loaderAnimate" />
				</div>

				{showPlayBtn && (
					<div className="w-8 h-8 rounded loaderAnimate" />
				)}
			</div>
		</div>
	);
};

export default MovieCardLoader;
