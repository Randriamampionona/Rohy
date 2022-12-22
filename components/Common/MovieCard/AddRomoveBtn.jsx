import { useEffect, useState } from "react";
import { RiHeartLine } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { useListHandler } from "../../../hooks";
import { ImSpinner2 } from "react-icons/im";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../lib/firebase.config";
import { AuthContext } from "../../../store/context/AuthContext";

const AddRomoveBtn = ({ movie }) => {
	const { currentUser } = AuthContext();
	const { addToMyListFunc, removeFromMyListFunc, loading } = useListHandler();
	const [isSavedHint, setIsSavedHint] = useState(null);

	// check if movie already saved
	useEffect(() => {
		const getSavedVideo = () => {
			const collectionRef = collection(
				db,
				"users",
				currentUser.uid,
				"myList"
			);
			const q = query(collectionRef, where("id", "==", movie?.id));
			const unsub = onSnapshot(q, (snapshot) => {
				const saved = snapshot.empty;
				setIsSavedHint(
					saved ? null : snapshot.docs.map((doc) => doc.id)
				);
			});

			return () => unsub();
		};

		currentUser?.uid && movie?.id && getSavedVideo();
	}, [currentUser, movie]);

	const addToMyListHandler = async (key) => {
		if (key === "add" && !loading.add) return await addToMyListFunc(movie);
		if (key === "remove" && !loading.remove)
			return await removeFromMyListFunc(isSavedHint);
	};

	return (
		<div className="z-10 absolute top-[6px] right-[6px]">
			{isSavedHint ? (
				<button
					disabled={loading.add}
					title="add to your list"
					className="flex items-center justify-center w-6 h-6 bg-lightDarkColor/50 rounded-full text-base text-whiteColor hover:bg-lightDarkColor disabled:cursor-progress"
					onClick={() => addToMyListHandler("remove")}>
					{loading.add ? (
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
					) : (
						<span>
							<FaTimes />
						</span>
					)}
				</button>
			) : (
				<button
					disabled={loading.add}
					title="add to your list"
					className="flex items-center justify-center w-6 h-6 bg-lightDarkColor/50 rounded-full text-base text-whiteColor hover:bg-lightDarkColor disabled:cursor-progress"
					onClick={() => addToMyListHandler("add")}>
					{loading.add ? (
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
					) : (
						<span>
							<RiHeartLine />
						</span>
					)}
				</button>
			)}
		</div>
	);
};

export default AddRomoveBtn;
