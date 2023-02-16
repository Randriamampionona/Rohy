import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import RequiredHint from "./RequiredHint";

const initValues = {
	name: "",
	desc: "",
	regular: "",
	promo: "",
	specificity: "",
	order: "",
};

const OfferForm = () => {
	const [canSubmit, setCanSubmit] = useState(false);
	const [values, setValues] = useState(initValues);

	useEffect(() => {
		const { name, desc, regular, promo, specificity, order } = values;

		const bool =
			!!name.trim() &&
			!!desc.trim() &&
			!!regular.trim() &&
			!!promo.trim() &&
			!!specificity.trim() &&
			!!order.trim();

		setCanSubmit(bool);
	}, [values]);

	const changeHandler = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const data = {
			name: values.name,
			desc: values.desc,
			price: {
				regular: values.regular,
				promo: values.promo,
			},
			specificity: values.specificity,
			order: values.order,
		};

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
								type="text"
								id="regular"
								name="regular"
								value={values.name}
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
								required
								type="text"
								id="promo"
								name="promo"
								value={values.promo}
								onChange={changeHandler}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* submit btn */}
			<button
				disabled={!canSubmit}
				type="submit"
				className="primaryBtn w-full shadow-btnShadow mt-6">
				{/* {loading ? (
					<>
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
						<span>Loading...</span>
					</>
				) : (
					<>
						<span>
							<FaUpload />
						</span>
						<span>Add new offer</span>
					</>
				)} */}
				<span>
					<FaPlus />
				</span>
				<span>Add new offer</span>
			</button>
		</form>
	);
};

export default OfferForm;
