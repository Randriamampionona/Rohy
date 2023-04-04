import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useOffer } from "../../../hooks";
import RequiredHint from "./RequiredHint";
import { useRouter } from "next/router";
import ButtonWithLoading from "./../Buttons/ButtonWithLoading";

const initValues = {
	name: "",
	desc: "",
	regular: "",
	promo: "",
	order: "",
	specificity: [],
};

const OfferForm = ({ specificityOptions, currentValues }) => {
	const { loading, addFunc, updateFunc } = useOffer();
	const { query } = useRouter();

	const [canSubmit, setCanSubmit] = useState(false);
	const [values, setValues] = useState(currentValues || initValues);

	useEffect(() => {
		const { name, desc, regular } = values;

		const bool = currentValues
			? true
			: !!name.trim() && !!desc.trim() && !!regular.trim();

		setCanSubmit(bool);
	}, [currentValues, values]);

	const changeHandler = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const selectHandler = (key) => {
		setValues((prev) => ({
			...prev,
			specificity: prev.specificity.includes(key)
				? prev.specificity.filter((sp) => !sp)
				: [...prev.specificity, key],
		}));
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
			specificity: values.specificity.map(
				(sp) => specificityOptions?.[sp]?.value
			),
			order: Number(values.order),
		};

		currentValues
			? await updateFunc(query.planID, data, "update")
			: await addFunc(data, "add");

		setValues(initValues);
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
									values.specificity.includes(sp.key) ||
									values.specificity.includes(sp.value)
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
			<ButtonWithLoading
				className={"primaryBtn w-full shadow-btnShadow mt-6"}
				btntext={currentValues ? "Update" : "Add new offer"}
				BtnIcon={currentValues ? <FaEdit /> : <FaPlus />}
				btnType={"submit"}
				isLoading={loading[currentValues ? "update" : "add"]}
				loadingText={"Loading"}
				disabled={
					!canSubmit && loading[currentValues ? "update" : "add"]
				}
			/>
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
