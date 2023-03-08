class Movie {
	#id;
	#category_name;
	#category_id;
	#adult;
	#backdrop_path;
	#poster_path;
	#genre_name;
	#genre_id;
	#original_language;
	#original_title;
	#title;
	#overview;
	#release_date;
	#video_url;
	#postBy;
	#createdAt;

	constructor(
		id,
		category_name,
		category_id,
		adult,
		backdrop_path,
		poster_path,
		genre_name,
		genre_id,
		original_language,
		original_title,
		title,
		overview,
		release_date,
		video_url,
		postBy,
		createdAt
	) {
		this.#id = id;
		this.#category_name = category_name;
		this.#category_id = category_id;
		this.#adult = adult;
		this.#backdrop_path = backdrop_path;
		this.#poster_path = poster_path;
		this.#genre_name = genre_name;
		this.#genre_id = genre_id;
		this.#original_language = original_language;
		this.#original_title = original_title;
		this.#title = title;
		this.#overview = overview;
		this.#release_date = release_date;
		this.#video_url = video_url;
		this.#postBy = postBy;
		this.#createdAt = createdAt;
	}

	#createStructuredMovie = () => {
		return {
			id: this.#id,
			category: {
				name: this.#category_name,
				id: this.#category_id,
			},
			adult: this.#adult,
			backdrop_path: this.#backdrop_path,
			poster_path: this.#poster_path,
			genre: {
				name: this.#genre_name,
				id: this.#genre_id,
			},
			original_language: this.#original_language,
			original_title: this.#original_title,
			title: this.#title,
			overview: this.#overview,
			release_date: this.#release_date,
			video: {
				url: this.#video_url,
				quality: "720p", // test
				size: 4055452, // test
			},
			postBy: this.#postBy,
			createdAt: this.#createdAt,
		};
	};

	movie = () => {
		return this.#createStructuredMovie();
	};
}

class PaginatedApiResponse {
	#table_page;
	#total_data;
	#data;
	#per_page;

	constructor(table_page = 1, total_data = 0, data = [], per_page = 10) {
		this.#table_page = table_page;
		this.#total_data = total_data;
		this.#data = data;
		this.#per_page = per_page;
	}

	// 10 movies per request
	#splicedMovies = () => {
		const start =
			this.#table_page == 1 ? 0 : this.#table_page * this.#per_page;
		const end =
			this.#table_page == 1 ? this.#per_page : start + this.#per_page;
		return this.#data.slice(start, end);
	};

	#createStructuredResponse = () => {
		return {
			page: this.#table_page,
			total_page: Math.floor(this.#total_data / this.#per_page),
			total_data: this.#total_data,
			results: this.#splicedMovies(),
		};
	};

	response = () => {
		return this.#createStructuredResponse();
	};
}

export { Movie, PaginatedApiResponse };
