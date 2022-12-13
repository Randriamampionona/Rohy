import toast from "react-hot-toast";

const toastNotify = (type, message) => {
	toast[type](message);
};

export default toastNotify;
