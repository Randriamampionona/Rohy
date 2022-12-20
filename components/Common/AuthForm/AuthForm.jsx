import Image from "next/image";
import authImg from "../../../public/assets/auth.jpg";
import { useState } from "react";
import {
	FaGithub,
	FaSignInAlt,
	FaUserCircle,
	FaFacebook,
	FaTwitter,
	FaWhatsapp,
} from "react-icons/fa";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner2 } from "react-icons/im";
import logo from "../../../public/assets/logo-with-rose-color.webp";
import { AuthContext } from "../../../store/context/AuthContext";
import Link from "next/link";

const initState = {
	username: "",
	email: "",
	password: "",
};

const AuthForm = ({ page, socialMedia }) => {
	const { authLoading, signinFunc, signupFunc, signinWithProviderFunc } =
		AuthContext();
	const [inputValue, setInputValue] = useState(initState);

	const changeHandler = (e) => {
		setInputValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (page === "signup") {
			await signupFunc(
				inputValue.username,
				inputValue.email,
				inputValue.password
			);
		} else {
			await signinFunc(inputValue.email, inputValue.password);
		}

		setInputValue(initState);
	};

	return (
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quod sunt inventore nihil porro.
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
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quod sunt inventore nihil porro.
					</p>
				</div>

				<div className="max-w-[21rem] w-full">
					<form
						className="flex flex-col w-full"
						onSubmit={submitHandler}>
						{/* username */}
						{page === "signup" && (
							<div className="flex items-center justify-between px-3 h-11 rounded-sm bg-whiteColor border border-gray-300 mb-3 focus-within:border focus-within:border-primaryColor">
								<span className="text-darkColor/50">
									<FiUser />
								</span>
								<input
									required
									autoFocus
									autoComplete="off"
									type="text"
									name="username"
									placeholder="Username"
									value={inputValue.username}
									onChange={changeHandler}
									className="flex-grow w-full border-0 outline-0 px-2 h-full bg-transparent"
								/>
							</div>
						)}

						{/* email */}
						<div className="flex items-center justify-between px-3 h-11 rounded-sm bg-whiteColor border border-gray-300 mb-3 focus-within:border focus-within:border-primaryColor">
							<span className="text-darkColor/50">
								<FiMail />
							</span>
							<input
								required
								autoFocus
								autoComplete="off"
								type="email"
								name="email"
								placeholder="Email address"
								value={inputValue.email}
								onChange={changeHandler}
								className="flex-grow w-full border-0 outline-0 px-2 h-full bg-transparent"
							/>
						</div>

						{/* password */}
						<div className="flex items-center justify-between px-3 h-11 rounded-sm bg-whiteColor border border-gray-300 mb-1 focus-within:border focus-within:border-primaryColor">
							<span className="text-darkColor/50">
								<FiLock />
							</span>
							<input
								required
								autoComplete="off"
								type="password"
								name="password"
								placeholder="Password"
								value={inputValue.password}
								onChange={changeHandler}
								className="flex-grow w-full border-0 outline-0 px-2 h-full bg-transparent"
							/>
						</div>

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

						{page === "signup" ? (
							<button className="primaryBtn" type="submit">
								{authLoading.signup ? (
									<span className="animate-spin">
										<ImSpinner2 />
									</span>
								) : (
									<>
										<span>
											<FaUserCircle />
										</span>
										<span>Sign Up</span>
									</>
								)}
							</button>
						) : (
							<button className="primaryBtn" type="submit">
								{authLoading.signin ? (
									<span className="animate-spin">
										<ImSpinner2 />
									</span>
								) : (
									<>
										<span>
											<FaSignInAlt />
										</span>
										<span>Sign In</span>
									</>
								)}
							</button>
						)}
					</form>

					<div className="flex items-center w-full my-6">
						<hr className="flex-grow flex-shrink" />
						<span className="px-4">or</span>
						<hr className="flex-grow flex-shrink" />
					</div>

					<div className="w-full flex flex-col gap-y-3">
						<button
							className="outlineBtn"
							onClick={() => signinWithProviderFunc("google")}>
							{authLoading.google ? (
								<span className="animate-spin">
									<ImSpinner2 />
								</span>
							) : (
								<>
									<span>
										<FcGoogle />
									</span>
									<span>Continue with Google</span>
								</>
							)}
						</button>

						<button
							className="outlineBtn"
							onClick={() => signinWithProviderFunc("github")}>
							{authLoading.github ? (
								<span className="animate-spin">
									<ImSpinner2 />
								</span>
							) : (
								<>
									<span>
										<FaGithub />
									</span>
									<span>Continue with Github</span>
								</>
							)}
						</button>
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

const Copyright = ({ rule }) => {
	return (
		<span
			className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-whiteColor text-xs ${rule}`}>
			&copy; 2022. All rights reserved
		</span>
	);
};
