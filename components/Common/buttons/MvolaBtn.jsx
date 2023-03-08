import mvolaLogo from "../../../public/assets/mvola.jpeg";
import ButtonWithLoading from "./ButtonWithLoading";

const MvolaBtn = ({ w = "w-52", onClick = () => null, loading = false }) => {
	return (
		<ButtonWithLoading
			className={`secondaryBtn ${w} bg-[#fccc22] mx-auto hover:bg-[#fccc22]`}
			isLoading={loading}
			loadingText={"Traitement"}
			btntext={"Pay with MVola"}
			btnImg={mvolaLogo}
			onClickHandler={onClick}
		/>
	);
};

export default MvolaBtn;
