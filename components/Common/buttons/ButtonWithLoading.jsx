import Image from "next/image";
import { Fragment } from "react";
import { FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const ButtonWithLoading = ({
	className = "",
	onClickHandler = () => {},
	disabled = false,
	isLoading = true,
	loadingText = null,
	btnType = "button",
	BtnIcon = null,
	btnImg = null,
	btntext = "Click me",
}) => {
	return (
		<button
			type={btnType}
			disabled={disabled || isLoading}
			className={className}
			onClick={onClickHandler}>
			{isLoading ? (
				<Fragment>
					<span className="animate-spin">
						<ImSpinner2 />
					</span>
					{loadingText && (
						<span className="font-semibold whitespace-nowrap">
							{loadingText}...
						</span>
					)}
				</Fragment>
			) : (
				<Fragment>
					{btnImg ? (
						<div className="relative w-[40%] h-full">
							<Image
								src={btnImg}
								alt={btnImg}
								layout="fill"
								objectFit="contain"
							/>
						</div>
					) : (
						<>{BtnIcon && <span>{BtnIcon}</span>}</>
					)}
					<span>{btntext}</span>
				</Fragment>
			)}
		</button>
	);
};

export default ButtonWithLoading;
