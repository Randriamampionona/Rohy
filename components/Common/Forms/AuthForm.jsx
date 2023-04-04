import Image from "next/image";
import authImg from "../../../public/assets/auth.jpg";
import { Fragment, useState } from "react";
import {
	FaGithub,
	FaSignInAlt,
	FaUserCircle,
	FaFacebook,
	FaTwitter,
	FaWhatsapp,
} from "react-icons/fa";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import logo from "../../../public/assets/logo-with-rose-color.webp";
import { AuthContext } from "../../../store/context/AuthContext";
import Link from "next/link";
import MetaHead from "./../MetaHead/MetaHead";
import ButtonWithLoading from "./../Buttons/ButtonWithLoading";
import { useFormik } from "formik";
import { authSchema_signin, authSchema_signup } from "./shemas";
import ErrorMsg from "./ErrorMsg";

const AuthForm = ({ page, socialMedia }) => {
	const { authLoading, signinWithProviderFunc } = AuthContext();

	return (
		<Fragment>
			<MetaHead subTitle={page === "signup" ? "Sign Up" : "Sign In"} />

			<div className="relative grid grid-cols-1 w-full h-full lg:grid-cols-[50%,1fr] xl:grid-cols-[50rem,1fr]">
				<div className="relative place-items-center hidden lg:grid">
					<Image
						src={authImg}
						alt="rohy auth page"
						layout="fill"
						objectFit="cover"
						className="brightness-[0.25]"
					/>
					<div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center max-w-[22rem] w-full">
						<Image
							src={logo}
							alt="rohy"
							width={95}
							height={75}
							style={{ objectFit: "cover" }}
							className="mb-4"
						/>
						<h1 className="text-center text-3xl font-semibold">
							Welcome to Rohy.io
						</h1>
						<p className="text-center text-sm">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quod sunt inventore nihil porro.
						</p>

						<div className="flex items-center justify-center gap-x-4 mt-4">
							{socialMedia?.map((r) => (
								<Link key={r.link} href={r.link}>
									<span className="grid place-items-center text-xl text-whiteColor bg-darkColor w-8 h-8 rounded shadow shadow-black hover:bg-primaryColor">
										<r.Icon />
									</span>
								</Link>
							))}
						</div>
					</div>
					<Copyright rule={"hidden lg:block"} />
				</div>

				<div className="z-10 relative flex flex-col items-center justify-center h-screen gap-y-8">
					<div className="flex flex-col items-center justify-center max-w-[21rem] w-full">
						<Image
							src={logo}
							alt="rohy"
							width={95}
							height={75}
							placeholder="blur"
							style={{ objectFit: "cover" }}
							className="mb-4 block lg:!hidden"
						/>
						<h1 className="text-center text-3xl font-semibold block lg:hidden">
							Welcome to Rohy.io
						</h1>
						<h1 className="text-center text-3xl font-semibold hidden lg:block">
							{page === "signup" ? "Sign Up" : "Sign In"}
						</h1>
						<p className="text-center text-sm block lg:hidden">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quod sunt inventore nihil porro.
						</p>
					</div>

					<div className="max-w-[21rem] w-full">
						{/* <FormInputs page={page} /> */}
						<FormInputs page={page} />

						<div className="flex items-center w-full my-6">
							<hr className="flex-grow flex-shrink" />
							<span className="px-4">or</span>
							<hr className="flex-grow flex-shrink" />
						</div>

						<div className="w-full flex flex-col gap-y-3">
							{/* google */}
							<ButtonWithLoading
								className={"outlineBtn"}
								btntext={"Continue with Google"}
								BtnIcon={<FcGoogle />}
								isLoading={authLoading.google}
								onClickHandler={() =>
									signinWithProviderFunc("google")
								}
							/>

							{/* github */}
							<ButtonWithLoading
								className={"outlineBtn"}
								btntext={"Continue with Github"}
								BtnIcon={<FaGithub />}
								isLoading={authLoading.github}
								onClickHandler={() =>
									signinWithProviderFunc("github")
								}
							/>
						</div>
					</div>

					<Copyright rule={"block lg:hidden"} />
				</div>

				<div className="block lg:hidden">
					<Image
						src={authImg}
						alt="rohy auth page"
						layout="fill"
						objectFit="cover"
						placeholder="blur"
						className="brightness-[0.05]"
					/>
				</div>
			</div>
		</Fragment>
	);
};

const FormInputs = ({ page }) => {
	const { authLoading, signinFunc, signupFunc } = AuthContext();
	const [showPass, setShowPass] = useState("password");

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},

		validationSchema:
			page === "signup" ? authSchema_signup : authSchema_signin,

		onSubmit: async (v, a) => {
			if (page === "signup") {
				await signupFunc(v.username, v.email, v.password);
			} else {
				await signinFunc(v.email, v.password);
			}

			a.resetForm();
		},
	});

	const tooglePassHandler = () => {
		setShowPass((prev) => (prev === "password" ? "text" : "password"));
	};

	return (
		<form
			className="flex flex-col w-full"
			autoComplete="off"
			onSubmit={handleSubmit}>
			{/* username */}
			{page === "signup" && (
				<div className="flex flex-col mb-3">
					<div
						className={`flex items-center justify-between px-3 h-11 rounded-sm bg-whiteColor border border-gray-300 focus-within:border focus-within:border-primaryColor ${
							touched.username &&
							errors.username &&
							"!border-red-500 focus-within:!border-red-500 text-red-500"
						}`}>
						<span className="text-darkColor/50">
							<FiUser />
						</span>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="flex-grow w-full border-0 outline-0 px-2 h-full bg-transparent text-darkColor"
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					{touched.username && errors.username && (
						<ErrorMsg msg={errors.username} />
					)}
				</div>
			)}

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

			{/* password */}
			<div className="flex flex-col mb-1">
				<div
					className={`flex items-center justify-between px-3 h-11 rounded-sm bg-whiteColor border border-gray-300 focus-within:border focus-within:border-primaryColor  ${
						touched.password &&
						errors.password &&
						"!border-red-500 focus-within:!border-red-500 text-red-500"
					}`}>
					<span className="text-darkColor/50">
						<FiLock />
					</span>
					<input
						type={showPass}
						name="password"
						placeholder="Password"
						className="flex-grow w-full border-0 outline-0 px-2 h-full bg-transparent text-darkColor"
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{!!values.password.trim() && (
						<span
							className="text-darkColor cursor-pointer"
							onClick={tooglePassHandler}>
							{showPass === "password" ? <FiEye /> : <FiEyeOff />}
						</span>
					)}
				</div>
				{touched.password && errors.password && (
					<ErrorMsg msg={errors.password} />
				)}
			</div>

			{/* links */}
			<div className="flex items-center justify-between flex-wrap text-sm mb-3">
				<p>
					{page === "signup"
						? "Already have an account?"
						: "Don' have an account?"}{" "}
					{page === "signup" ? (
						<Link href="/authorization/signin">
							<a className="text-primaryColor underline">
								sign in
							</a>
						</Link>
					) : (
						<Link href="/authorization/signup">
							<a className="text-primaryColor underline">
								sign up
							</a>
						</Link>
					)}
				</p>

				{page === "signin" && (
					<Link href="/authorization/reset-password">
						<a className="text-primaryColor underline">
							Forget password
						</a>
					</Link>
				)}
			</div>

			{/* submit btn */}
			{page === "signup" ? (
				<ButtonWithLoading
					className={"primaryBtn"}
					btnType={"submit"}
					btntext={"Sign Up"}
					BtnIcon={<FaUserCircle />}
					isLoading={authLoading.signup || isSubmitting}
				/>
			) : (
				<ButtonWithLoading
					className={"primaryBtn"}
					btnType={"submit"}
					btntext={"Sign In"}
					BtnIcon={<FaSignInAlt />}
					isLoading={authLoading.signin || isSubmitting}
				/>
			)}
		</form>
	);
};

const Copyright = ({ rule }) => {
	return (
		<span
			className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-whiteColor text-xs ${rule}`}>
			Copyright &copy; {new Date().getFullYear()} Rohy.io. All rights
			reserved.
		</span>
	);
};

AuthForm.defaultProps = {
	socialMedia: [
		{
			link: "https://facebook.com",
			Icon: FaFacebook,
		},
		{
			link: "https://twitter.com",
			Icon: FaTwitter,
		},
		{
			link: "https://whatsapp.com",
			Icon: FaWhatsapp,
		},
	],
};

export default AuthForm;
