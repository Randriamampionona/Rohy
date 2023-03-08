/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { FaEdit, FaImage, FaPlus, FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useUsers } from "../../../hooks";
import RequiredHint from "./RequiredHint";

const initValues = {
	displayName: "",
	email: "",
	password: "",
	role: "",
};

const initFiles = {
	photoURL: {
		fileName: null,
		base64: null,
		process: null,
	},
};

import { AuthContext } from "../../../store/context/AuthContext";

const UserForm = ({ currentValues = null, roleOptions }) => {
	const { currentUser } = AuthContext();
	const { loading, addFunc, changeRoleFunc } = useUsers();
	const { query } = useRouter();

	const [canSubmit, setCanSubmit] = useState(false);
	const [files, setFiles] = useState(currentValues?.initFiles || initFiles);
	const [values, setValues] = useState(
		currentValues?.initValues || initValues
	);
	const inpRef = useRef();

	useEffect(() => {
		const { email, displayName, password } = values;

		const bool =
			!!email.trim() && !!displayName.trim() && !!password.trim();

		setCanSubmit(bool);
	}, [values]);

	const changeHandler = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const changeFileHandler = (file) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onprogress = ({ loaded, total }) => {
			const purcentages = +((loaded / total) * 100).toFixed();

			setFiles((prev) => ({
				photoURL: {
					...prev.photoURL,
					process: purcentages,
				},
			}));
		};

		reader.onloadend = (base64) => {
			setFiles((prev) => ({
				photoURL: {
					...prev.photoURL,
					fileName: file.name,
					base64: base64.target.result,
				},
			}));
		};
	};

	const filePickerHandler = (ref) => {
		ref?.current.click();
	};

	const resetMediaHandler = () => {
		setFiles({
			photoURL: {
				fileName: null,
				base64: null,
				process: null,
			},
		});
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		const addUserData = {
			email: values.email,
			displayName: values.displayName,
			password: values.password,
			role: values.role,
			photoURL: files.photoURL.base64,
		};

		const updateUserData = {
			role: values.role,
		};

		currentValues
			? await changeRoleFunc(query.uid, updateUserData, "change_role")
			: await addFunc(addUserData, "add");

		setFiles(initFiles);
		setValues(initValues);
	};

	return (
		<form className="max-w-md mx-auto" onSubmit={submitHandler}>
			<div className="w-full space-y-2">
				{/* Username */}
				<div className="w-full">
					<label htmlFor="displayName" className="text-sm">
						Username <RequiredHint />
					</label>
					<div
						className={`bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor ${
							!!currentValues &&
							"cursor-not-allowed opacity-30 pointer-events-none"
						}`}>
						<input
							readOnly={!!currentValues}
							disabled={!!currentValues}
							required
							type="text"
							id="displayName"
							name="displayName"
							value={values.displayName}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* Email */}
				<div className="w-full">
					<label htmlFor="email" className="text-sm">
						Email <RequiredHint />
					</label>
					<div
						className={`bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor ${
							!!currentValues &&
							"cursor-not-allowed opacity-30 pointer-events-none"
						}`}>
						<input
							readOnly={!!currentValues}
							disabled={!!currentValues}
							required
							type="email"
							id="email"
							name="email"
							value={values.email}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* Password */}
				<div className="w-full">
					<label htmlFor="password" className="text-sm">
						Password <RequiredHint />
					</label>
					<div
						className={`bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor ${
							!!currentValues &&
							"cursor-not-allowed opacity-30 pointer-events-none"
						}`}>
						<input
							readOnly={!!currentValues}
							disabled={!!currentValues}
							required
							type="password"
							id="password"
							name="password"
							value={values.password}
							onChange={changeHandler}
						/>
					</div>
				</div>

				{/* Role */}
				<div className="w-full">
					<label htmlFor="role" className="text-sm">
						Role
					</label>
					<div className="w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor">
						<select
							id="role"
							name="role"
							defaultValue={!!currentValues && values.role}
							onChange={changeHandler}>
							<option value="">Choose role</option>
							{roleOptions?.map((opt, i) => (
								<option key={i} value={opt.key}>
									{opt.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* separator */}
				<div className="flex items-center w-full !mt-10">
					<hr className="flex-grow flex-shrink" />
					<span className="px-4">Profile</span>
					<hr className="flex-grow flex-shrink" />
				</div>

				{/* Profile */}
				<details
					className={`w-full bg-whiteColor p-2 rounded border border-lightDarkColor/20 focus-within:border-primaryColor ${
						!!currentValues &&
						"cursor-not-allowed opacity-30 pointer-events-none"
					}`}>
					<summary className="cursor-pointer">
						{files.photoURL.fileName ? (
							<label className="pointer-events-none">
								{files.photoURL.fileName}
							</label>
						) : (
							<label className="pointer-events-none">
								Profile image
							</label>
						)}
					</summary>

					{!files.photoURL.base64 ? (
						<MediaInputBox
							Icon={FaImage}
							inputRef={inpRef}
							changeFileHandler={changeFileHandler}
							filePickerHandler={filePickerHandler}
							progress={files.photoURL.process}
						/>
					) : (
						<MediaPreview
							mediaName={files.photoURL.fileName}
							base64URL={files.photoURL.base64}
							resetMediaHandler={resetMediaHandler}
						/>
					)}
				</details>
			</div>

			{/* submit btn */}
			{currentUser?.role !== "super admin" ? (
				<span className="text-sm text-center text-red-500 mx-auto mt-6">
					You don&apos;t have permission to{" "}
					{currentValues ? "update user" : "add new user"}
				</span>
			) : (
				<button
					disabled={
						!canSubmit &&
						(loading["change_role"] || loading["disabled"])
					}
					type="submit"
					className="primaryBtn w-full shadow-btnShadow mt-6">
					{loading[currentValues ? "change_role" : "add"] ? (
						<>
							<span className="animate-spin">
								<ImSpinner2 />
							</span>
							<span>Loading...</span>
						</>
					) : (
						<>
							<span>
								{currentValues ? <FaEdit /> : <FaPlus />}
							</span>
							<span>
								{currentValues ? "Update" : "Add new user"}
							</span>
						</>
					)}
				</button>
			)}
		</form>
	);
};

const MediaPreview = ({ mediaName, base64URL, resetMediaHandler }) => {
	return (
		<div className="relative w-full h-full mt-4 rounded overflow-hidden">
			<button
				className="z-20 absolute top-3 right-3 flex items-center justify-center w-6 h-6 bg-red-500/50 rounded-full text-base text-whiteColor hover:bg-red-500 disabled:cursor-progress"
				onClick={resetMediaHandler}>
				<span>
					<FaTimes />
				</span>
			</button>

			<img
				src={base64URL}
				alt={mediaName}
				className="w-full h-full object-contain"
			/>
		</div>
	);
};

const MediaInputBox = ({
	Icon,
	inputRef,
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
					className="hidden"
					accept="image/*"
					onChange={(e) => changeFileHandler(e.target.files[0])}
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
					<span>Choose image</span>
				</button>
			</div>
		</div>
	);
};

UserForm.defaultProps = {
	roleOptions: [
		{ key: 1, name: "super admin" },
		{ key: 2, name: "admin" },
		{ key: 3, name: "user" },
	],
};

export default UserForm;
