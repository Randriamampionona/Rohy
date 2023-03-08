import { Fragment, useEffect, useState } from "react";
import { AuthContext } from "../../../store/context/AuthContext";
import { FiMail } from "react-icons/fi";
import ErrorMsg from "./ErrorMsg";
import ButtonWithLoading from "../Buttons/ButtonWithLoading";
import { useFormik } from "formik";
import { resetPasswordSchema } from "./shemas";
import { FaCheckCircle } from "react-icons/fa";

const ResetPasswordForm = () => {
	const { resetPasswordFunc, authLoading } = AuthContext();
	const [emailSent, setEmailSent] = useState(false);

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useFormik({
		initialValues: {
			email: "",
		},

		validationSchema: resetPasswordSchema,

		onSubmit: async (v, a) => {
			const r = await resetPasswordFunc(v.email);
			setEmailSent(r?.success || false);
			a.resetForm();
		},
	});

	useEffect(() => {
		const timiID = setTimeout(() => {
			emailSent && setEmailSent(false);
		}, 5000);

		return () => clearTimeout(timiID);
	}, [emailSent]);

	return (
		<Fragment>
			{emailSent ? (
				<SuccessBlock />
			) : (
				<form
					className="flex flex-col w-full"
					autoComplete="off"
					onSubmit={handleSubmit}>
					<h1 className="text-center text-2xl font-semibold mb-5 mx-auto">
						Reset password
					</h1>

					{/* email */}
					<div className="flex flex-col mb-3">
						<div
							className={`flex items-center justify-between px-3 h-11 rounded-sm bg-whiteColor border border-gray-300 focus-within:border focus-within:border-primaryColor ${
								touched.email &&
								errors.email &&
								"!border-red-500 focus-within:!border-red-500 text-red-500"
							}`}>
							<span className="text-darkColor/50">
								<FiMail />
							</span>
							<input
								autoFocus
								type="email"
								name="email"
								placeholder="Email address"
								className="flex-grow w-full border-0 outline-0 px-2 h-full bg-transparent text-darkColor"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
						{touched.email && errors.email && (
							<ErrorMsg msg={errors.email} />
						)}
					</div>

					{/* btn */}
					<ButtonWithLoading
						className={"primaryBtn"}
						btnType={"submit"}
						btntext={"Submit"}
						isLoading={authLoading.resetPassword || isSubmitting}
						loadingText={"Loading"}
					/>
				</form>
			)}
		</Fragment>
	);
};

const SuccessBlock = () => {
	return (
		<div className="flex flex-col items-center justify-center space-y-6">
			<span className="text-6xl mx-auto text-green-400 mb-5">
				<FaCheckCircle />
			</span>

			<p className="text-whiteColor/50 text-center text-clip max-w-[70%]">
				A password rest email was sent, check your inbox.
			</p>
		</div>
	);
};

export default ResetPasswordForm;
