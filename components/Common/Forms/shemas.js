import * as yup from "yup";

const regexp = {
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
};

export const authSchema_signup = yup.object().shape({
	username: yup
		.string()
		.min(6, "Username should contains at least 6 charracteres")
		.max(8, "Username should be less than 8 charracteres")
		.required("Please fill out this field"),
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please fill out this field"),
	password: yup
		.string()
		.min(5, "Password should contains at least 5 charracteres")
		.matches(regexp.password, {
			message: "Please create a strong password",
		})
		.required("Please fill out this field"),
});

export const authSchema_signin = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please fill out this field"),
	password: yup
		.string()
		.min(5, "Password should contains at least 5 charracteres")
		.required("Please fill out this field"),
});

export const resetPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please fill out this field"),
});
