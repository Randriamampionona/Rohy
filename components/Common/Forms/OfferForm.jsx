import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useOffer } from "../../../hooks";
import RequiredHint from "./RequiredHint";

const initValues = {
	name: "",
	desc: "",
	regular: "",
	promo: "",
	order: "",
};

const OfferForm = ({ specificityOptions }) => {
	const { loading, addFunc } = useOffer();

	const [canSubmit, setCanSubmit] = useState(false);
	const [values, setValues] = useState(initValues);
	const [specificity, setSpecificity] = useState([]);

	useEffect(() => {
		const { name, desc, regular } = values;

		const bool = !!name.trim() && !!desc.trim() && !!regular.trim();

		setCanSubmit(bool);
	}, [values]);

	const changeHandler = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const selectHandler = (key) => {
		setSpecificity((prev) =>
			prev.includes(key) ? prev.filter((sp) => !sp) : [...prev, key]
		);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const data = {
			name: values.name,
			desc: values.desc,
			price: {
				regular: Number(values.regular),
				promo: Number(values.promo),
			},
			specificity: specificity.map(
				(sp) => specificityOptions?.[sp]?.value
			),
			order: Number(values.order),
		};

		await addFunc(data, "add");

		setValues(initValues);
		setSpecificity([]);
	};

	return (
		<form className="max-w-md mx-auto" onSubmit={submitHandler}>
			<div className="w-full space-y-2">
				{/* name */}
				<div className="w-full">
					<label htmlFor="name" className="text-sm">
						Name <RequiredHint />
					</label>
					<div className="bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<input
							required
							type="text"
							id="name"
							name="name"
							value={values.name}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* price */}
				<div className="flex gap-x-2 w-full">
					<div className="flex-grow">
						<label htmlFor="regular" className="text-sm">
							Regular price <RequiredHint />
						</label>
						<div className="bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
							<input
								required
								type="number"
								id="regular"
								name="regular"
								value={values.regular}
								onChange={changeHandler}
							/>
						</div>
					</div>

					<div className="flex-grow">
						<label htmlFor="promo" className="text-sm">
							Promo price
						</label>
						<div className="bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
							<input
								type="number"
								id="promo"
								name="promo"
								value={values.promo}
								onChange={changeHandler}
							/>
						</div>
					</div>
				</div>

				{/* desc */}
				<div className="w-full">
					<label htmlFor="desc" className="text-sm">
						Description <RequiredHint />
					</label>

					<div className="w-full h-60 bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<textarea
							required
							name="desc"
							id="desc"
							className="w-full !h-full resize-none"
							value={values.desc}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* order */}
				<div className="w-full">
					<label htmlFor="order" className="text-sm">
						Order
					</label>
					<div className="bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<input
							type="number"
							id="order"
							name="order"
							value={values.order}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* separator */}
				<div className="flex items-center w-full !mt-10">
					<hr className="flex-grow flex-shrink" />
					<span className="px-4">Specificity</span>
					<hr className="flex-grow flex-shrink" />
				</div>

				<div className="relative w-full max-h-52 bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor overflow-auto">
					<label className="sticky top-0 text-sm">
						Select specificities <RequiredHint />
					</label>

					<div className="flex items-start justify-start flex-wrap gap-2 mt-4">
						{specificityOptions?.map((sp) => (
							<span
								onClick={() => selectHandler(sp.key)}
								key={sp.key}
								className={`px-2 py-[1px] rounded-full text-whiteColor text-center text-base whitespace-nowrap hover:bg-primaryColor ${
									specificity.includes(sp.key)
										? "bg-primaryColor cursor-default"
										: "bg-gray-500 cursor-pointer"
								}`}>
								{sp.value}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* submit btn */}
			<button
				disabled={!canSubmit && loading.add}
				type="submit"
				className="primaryBtn w-full shadow-btnShadow mt-6">
				{loading.add ? (
					<>
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
						<span>Loading...</span>
					</>
				) : (
					<>
						<span>
							<FaPlus />
						</span>
						<span>Add new offer</span>
					</>
				)}
			</button>
		</form>
	);
};

OfferForm.defaultProps = {
	specificityOptions: [
		{
			key: 0,
			value: "Lorem ipsum",
		},
		{
			key: 1,
			value: "Dolor",
		},
		{
			key: 2,
			value: "Consectetur",
		},
		{
			key: 3,
			value: "Adipisicing elit",
		},
		{
			key: 4,
			value: "Dicta",
		},
		{
			key: 5,
			value: "Culpa accusantium",
		},
		{
			key: 6,
			value: "Architecto",
		},
		{
			key: 7,
			value: "Saepe atque",
		},
		{
			key: 8,
			value: "Perspiciatis",
		},
		{
			key: 9,
			value: "tempore",
		},
		{
			key: 10,
			value: "Doloremque",
		},
		{
			key: 11,
			value: "Dolores",
		},
	],
};

export default OfferForm;
