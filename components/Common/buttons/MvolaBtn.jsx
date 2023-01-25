import React from "react";
import Image from "next/image";
import mvolaLogo from "../../../public/assets/mvola.jpeg";

const MvolaBtn = ({ w = "w-52", onClick = () => null }) => {
	return (
		<button
			className={`secondaryBtn ${w} bg-[#fccc22] mx-auto hover:bg-[#fccc22]`}
			onClick={onClick}>
			<div className="relative w-[40%] h-full">
				<Image
					src={mvolaLogo}
					alt="mvola-logo"
					layout="fill"
					objectFit="contain"
				/>
			</div>
			<span className="font-semibold whitespace-nowrap">
				Pay with MVola
			</span>
		</button>
	);
};

export default MvolaBtn;
