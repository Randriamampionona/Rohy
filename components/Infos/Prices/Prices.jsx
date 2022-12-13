import React from "react";

const Prices = () => {
	return (
		<main className="relative flex flex-col items-center justify-center bg-primaryColor py-10 px-4 before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-10 before:h-10 before:bg-primaryColor before:rotate-45">
			<div className="flex flex-col items-center justify-center text-darkColor text-center mb-10">
				<h1 className="text-4xl font-bold uppercase">tout vos</h1>
				<h2 className="text-2xl font-bold">
					FILMS, SERIES et DOCUMENTAIRE
				</h2>
			</div>

			<div className="flex flex-col items-end justify-center uppercase">
				<h1 className="text-whiteColor text-4xl font-bold leading-[0.85]">
					pour seulement
				</h1>
				<h1 className="text-whiteColor text-8xl font-extrabold leading-[0.85]">
					19.000
				</h1>
				<h2 className="text-darkColor text-4xl font-bold">AR/MOIS</h2>
			</div>
		</main>
	);
};

export default Prices;
