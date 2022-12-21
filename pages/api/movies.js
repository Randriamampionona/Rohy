const handler = async (_req, res) => {
	const movie = {
		adult: false,
		backdrop_path: "/assets/screenshot.png",
		genre_ids: [28, 14, 878],
		id: 587651,
		original_language: "en",
		original_title: "Thor Ragnarok",
		overview:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates animi molestiae labore sapiente porro odio repellendus nemo a ad voluptate, in ipsum praesentium culpa, minima consequatur facere eum officia excepturi.",
		popularity: 654.248,
		poster_path: "/assets/screenshot.png",
		release_date: "08 October 2019",
		title: "Thor Ragnarok",
		video: false,
		vote_average: 7.3,
		vote_count: 5754,
	};

	res.status(200).json({
		page: 1,
		total_page: 54752,
		results: Array(7).fill(movie),
	});
};

export default handler;
