import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { FiMail } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { MetaHead } from "../../../components/Common";
import { AuthContext } from "../../../store/context/AuthContext";
import getCurrentUserProps from "../../../utils/getCurrentUserProps";

const EditPage = () => {
	const { currentUser, resetPasswordFunc } = AuthContext();
	const [email, setEmail] = useState("");
	const {
		query: { key },
	} = useRouter();

	const resetPassHandler = async (e) => {
		e.preventDefault();

		const isCorrectEmail = email.trim() === currentUser.email;

		if (currentUser && isCorrectEmail) {
			await resetPasswordFunc(email);
			setEmail("");
			return;
		}
	};

	return (
		<Fragment>
			<MetaHead subTitle={`Reset ${key}`} />
			<section className="pageSection mx-auto">
				<form
					className="flex flex-col w-52 mx-auto"
					onSubmit={resetPassHandler}>
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="flex-grow w-full border-0 outline-0 px-2 h-full bg-transparent text-darkColor"
						/>
					</div>

					<button
						className="primaryBtn"
						type="submit"
						disabled={email.trim() === currentUser.email}>
						<span>
							<BiSend />
						</span>
						<span>Submit</span>
					</button>
				</form>
			</section>
		</Fragment>
	);
};

export default EditPage;

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		return {
			props: {
				...user,
			},
		};
	} catch (error) {
		return {
			props: {
				...user,
			},
		};
	}
};
