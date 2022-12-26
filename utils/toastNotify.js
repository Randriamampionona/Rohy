import toast from "react-hot-toast";

const toastNotify = (type, message) => {
	toast[type](
		message?.code
			? message?.code?.split("/")[1].split("-")?.join(" ")
			: message
	);
};

export default toastNotify;
