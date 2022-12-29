import React from "react";

const MobileMenu = ({ setOpen }) => {
	return (
		<aside
			className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/75"
			onClick={() => setOpen(false)}>
			<h1 className="text-center text-white text-xl">
				Mobile menu goes here
			</h1>
		</aside>
	);
};

export default MobileMenu;
