import { useEffect, useRef, useState } from "react";
import { FaUpload, FaImage, FaVideo, FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useMovie } from "../../../hooks";
import RequiredHint from "./RequiredHint";

const monthsAsText = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const initValues = {
	original_title: "",
	title: "",
	category: "",
	genre: "",
	original_language: "",
	days: "",
	months: "",
	years: "",
	overview: "",
};

const initFiles = {
	poster: {
		fileName: null,
		base64: null,
		process: null,
	},
	video: {
		fileName: null,
		base64: null,
		process: null,
	},
};

const MovieForm = ({
	categoryOptions,
	genreOptions,
	languageOptions,
	releaseDateOptions,
}) => {
	const { loading, uploadFunc } = useMovie();

	const [canSubmit, setCanSubmit] = useState(false);
	const [adult, setAdult] = useState(false);
	const [values, setValues] = useState(initValues);
	const [files, setFiles] = useState(initFiles);
	const posterRef = useRef();
	const videoRef = useRef();

	useEffect(() => {
		const {
			original_title,
			category,
			genre,
			original_language,
			days,
			months,
			years,
			overview,
		} = values;
		const { poster, video } = files;

		const bool =
			!!original_title.trim() &&
			!!category.trim() &&
			!!genre.trim() &&
			!!original_language.trim() &&
			!!days.trim() &&
			!!months.trim() &&
			!!years.trim() &&
			!!overview.trim() &&
			!!poster &&
			!!video;

		setCanSubmit(bool);
	}, [files, values]);

	const changeHandler = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const changeFileHandler = (file, key) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onprogress = ({ loaded, total }) => {
			const purcentages = +((loaded / total) * 100).toFixed();

			setFiles((prev) => ({
				...prev,
				[key]: {
					...prev[key],
					process: purcentages,
				},
			}));
		};

		reader.onloadend = (base64) => {
			setFiles((prev) => ({
				...prev,
				[key]: {
					...prev[key],
					fileName: file.name,
					base64: base64.target.result,
				},
			}));
		};
	};

	const filePickerHandler = (ref) => {
		ref?.current.click();
	};

	const resetMediaHandler = (key) => {
		setFiles((prev) => ({
			...prev,
			[key]: {
				fileName: null,
				base64: null,
				process: null,
			},
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const data = {
			category: { name: values.category },
			adult,
			poster: files.poster.base64, // base64
			genre: { name: values.genre },
			original_language: values.original_language,
			original_title: values.original_title,
			title: values.title,
			overview: values.overview,
			release_date: new Date(
				`%${values.months}-%${values.days}-%${values.years}`
			).toISOString(),
			video: files.video.base64, // base64
		};

		await uploadFunc(data);

		setAdult(false);
		setValues(initValues);
		setFiles(initFiles);
	};

	return (
		<form className="max-w-md mx-auto" onSubmit={submitHandler}>
			<div className="w-full space-y-2">
				{/* original_title */}
				<div className="w-full">
					<label htmlFor="original_title" className="text-sm">
						Original title <RequiredHint />
					</label>
					<div className="bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<input
							required
							type="text"
							id="original_title"
							name="original_title"
							value={values.original_title}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* title */}
				<div className="w-full">
					<label htmlFor="title" className="text-sm">
						Title
					</label>
					<div className="bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<input
							type="text"
							id="title"
							name="title"
							value={values.title}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* category */}
				<div className="w-full">
					<label htmlFor="category" className="text-sm">
						Category <RequiredHint />
					</label>
					<div className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<select
							required
							id="category"
							name="category"
							onChange={changeHandler}>
							<option value="">Choose category</option>
							{categoryOptions?.map((opt, i) => (
								<option key={i} value={opt}>
									{opt}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* genre */}
				<div className="w-full">
					<label htmlFor="genre" className="text-sm">
						Genre <RequiredHint />
					</label>
					<div className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<select
							required
							id="genre"
							name="genre"
							onChange={changeHandler}>
							<option value="">Choose genre</option>
							{genreOptions?.map((opt, i) => (
								<option key={i} value={opt}>
									{opt}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* language */}
				<div className="w-full">
					<label htmlFor="original_language" className="text-sm">
						Original language <RequiredHint />
					</label>
					<div className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<select
							required
							id="original_language"
							name="original_language"
							onChange={changeHandler}>
							<option value="">Choose language</option>
							{languageOptions?.map((opt, i) => (
								<option key={i} value={opt}>
									{opt}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* release_date */}
				<div className="flex gap-x-2 w-full">
					<div className="flex-grow">
						<label htmlFor="days" className="text-sm">
							Days <RequiredHint />
						</label>
						<div className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
							<select
								required
								id="days"
								name="days"
								onChange={changeHandler}>
								<option value="">Days</option>
								{releaseDateOptions.days?.map((opt, i) => (
									<option key={i} value={opt}>
										{opt}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="flex-grow">
						<label htmlFor="months" className="text-sm">
							Months <RequiredHint />
						</label>
						<div className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
							<select
								required
								id="months"
								name="months"
								onChange={changeHandler}>
								<option value="">Months</option>
								{releaseDateOptions.months?.map((opt, i) => (
									<option key={i} value={opt}>
										{monthsAsText[i]}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="flex-grow">
						<label htmlFor="months" className="text-sm">
							Years <RequiredHint />
						</label>
						<div className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
							<select
								required
								id="years"
								name="years"
								onChange={changeHandler}>
								<option value="">Years</option>
								{releaseDateOptions.years?.map((opt, i) => (
									<option key={i} value={opt}>
										{opt}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* adult */}
				<div className="w-full">
					<label htmlFor="adult" className="text-sm">
						Adult
					</label>
					<div className="flex space-x-2">
						<input
							type="checkbox"
							name="adult"
							id="adult"
							className="w-auto accent-primaryColor"
							checked={adult}
							onChange={(e) => setAdult(e.target.checked)}
						/>
						<span className="text-xs text-gray-400">
							Check this if the movie is for adult only
						</span>
					</div>
				</div>

				{/* overview */}
				<div className="w-full">
					<label htmlFor="overview" className="text-sm">
						Overview <RequiredHint />
					</label>

					<div className="w-full h-60 bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<textarea
							name="overview"
							id="overview"
							className="w-full !h-full resize-none"
							value={values.overview}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* separator */}
				<div className="flex items-center w-full !mt-10">
					<hr className="flex-grow flex-shrink" />
					<span className="px-4">Medias</span>
					<hr className="flex-grow flex-shrink" />
				</div>

				{/* poster */}
				<details className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
					<summary className="cursor-pointer">
						{files.poster.fileName ? (
							<label className="pointer-events-none">
								{files.poster.fileName}
							</label>
						) : (
							<label className="pointer-events-none">
								Poster <RequiredHint />
							</label>
						)}
					</summary>

					{!files.poster.base64 ? (
						<MediaInputBox
							Icon={FaImage}
							inputRef={posterRef}
							inputName={"poster"}
							changeFileHandler={changeFileHandler}
							filePickerHandler={filePickerHandler}
							progress={files.poster.process}
						/>
					) : (
						<MediaPreview
							mediaName={"poster"}
							base64URL={files.poster.base64}
							resetMediaHandler={resetMediaHandler}
						/>
					)}
				</details>

				{/* video */}
				<details className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
					<summary className="cursor-pointer">
						{files.video.fileName ? (
							<label className="pointer-events-none">
								{files.video.fileName}
							</label>
						) : (
							<label className="pointer-events-none">
								Video <RequiredHint />
							</label>
						)}
					</summary>

					{!files.video.base64 ? (
						<MediaInputBox
							Icon={FaVideo}
							inputRef={videoRef}
							inputName={"video"}
							changeFileHandler={changeFileHandler}
							filePickerHandler={filePickerHandler}
							progress={files.video.process}
						/>
					) : (
						<MediaPreview
							mediaName={"video"}
							base64URL={files.video.base64}
							resetMediaHandler={resetMediaHandler}
						/>
					)}
				</details>
			</div>

			{/* submit btn */}
			<button
				disabled={!canSubmit || loading}
				type="submit"
				className="primaryBtn w-full shadow-btnShadow mt-6">
				{loading ? (
					<>
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
						<span>Uploading...</span>
					</>
				) : (
					<>
						<span>
							<FaUpload />
						</span>
						<span>Upload</span>
					</>
				)}
			</button>
		</form>
	);
};

const MediaPreview = ({ mediaName, base64URL, resetMediaHandler }) => {
	return (
		<div className="relative w-full h-full mt-4 rounded overflow-hidden">
			<button
				className="z-20 absolute top-3 right-3 flex items-center justify-center w-6 h-6 bg-red-500/50 rounded-full text-base text-whiteColor hover:bg-red-500 disabled:cursor-progress"
				onClick={() => resetMediaHandler(mediaName)}>
				<span>
					<FaTimes />
				</span>
			</button>

			{mediaName === "poster" ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={base64URL}
					alt="mediaName"
					className="w-full h-full object-contain"
				/>
			) : (
				<video
					src={base64URL}
					controls
					autoPlay={false}
					muted
					className="w-full h-full"
				/>
			)}
		</div>
	);
};

const MediaInputBox = ({
	Icon,
	inputRef,
	inputName,
	changeFileHandler,
	filePickerHandler,
	progress,
}) => {
	return (
		<div className="flex w-full h-40">
			<div className="flex flex-col items-center justify-center w-full">
				<Icon size={45} color="rgb(24 23 31 / 0.1)" />
				<input
					ref={inputRef}
					type="file"
					name={inputName}
					className="hidden"
					accept={inputName === "poster" ? "image/*" : "video/*"}
					onChange={(e) =>
						changeFileHandler(e.target.files[0], inputName)
					}
				/>
				{progress && (
					<span className="text-sm py-2 text-center">
						{progress} %
					</span>
				)}
				<button
					type="button"
					className="secondaryBtn shadow-btnShadow mt-4"
					onClick={() => filePickerHandler(inputRef)}>
					<span>Choose {inputName}</span>
				</button>
			</div>
		</div>
	);
};

MovieForm.defaultProps = {
	categoryOptions: [
		"Sport",
		"Cinema",
		"Youth",
		"Info",
		"Series",
		"Documentaries",
		"Entertainment",
		"Music",
		"Adult",
	],

	genreOptions: ["Action", "Dram", "Commedi", "Fantasy"],

	languageOptions: ["Fr", "En"],

	releaseDateOptions: {
		days: Array(31)
			.fill(undefined)
			.map((_, i) => JSON.stringify(i + 1)),
		months: Array(12)
			.fill(undefined)
			.map((_, i) => JSON.stringify(i + 1)),
		years: Array(2023)
			.fill(undefined)
			.map((_, i) => JSON.stringify(i + 1))
			.slice(1989),
	},
};

export default MovieForm;

// category: { name: categoryName },
// adult,
// poster, // base64
// genre: { name: genreName },
// original_language,
// original_title,
// title,
// overview,
// release_date,
// video, // base64
