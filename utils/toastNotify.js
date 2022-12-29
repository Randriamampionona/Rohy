import toast from "react-hot-toast";

const toastNotify = (type, msg) => {
	toast[type](msg?.code || msg);
};

export default toastNotify;
