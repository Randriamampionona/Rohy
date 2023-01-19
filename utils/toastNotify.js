import toast from "react-hot-toast";

const toastNotify = (type = null, msg) => {
	type ? toast[type](msg?.code || msg) : msg?.code || msg;
};

export default toastNotify;
