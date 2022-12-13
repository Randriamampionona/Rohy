import { Widget } from "../../Common";
import Image from "next/image";
import img from "../../../public/assets/auth.jpg";

const Category = (props) => {
	return (
		<div className="grid grid-cols-2 grid-rows-[repeat(5,11rem)] gap-4 md:grid-cols-3 md:grid-rows-[repeat(3,11rem)] lg:grid-cols-4">
			<div className="row-[1/3] col-[1/3] bg-lightDarkColor rounded-sm md:col-auto md:row-[1/3] lg:row-[1/3]">
				<Widget {...props} />
			</div>
			<div className="relative group overflow-hidden  bg-lightDarkColor rounded-sm md:row-auto lg:row-auto">
				<CategoryImage />
			</div>
			<div className="relative group overflow-hidden row-[2/4] bg-lightDarkColor rounded-sm md:row-[1/3] md:col-[3/4] lg:row-[1/3]">
				<CategoryImage />
			</div>
			<div className="relative group overflow-hidden  bg-lightDarkColor rounded-sm md:row-[2/4] lg:row-auto">
				<CategoryImage />
			</div>
			<div className="relative group overflow-hidden row-[4/6] bg-lightDarkColor rounded-sm md:row-auto lg:row-[2/4]">
				<CategoryImage />
			</div>
			<div className="relative group overflow-hidden row-[3/5] bg-lightDarkColor rounded-sm md:row-auto lg:row-[2/4]">
				<CategoryImage />
			</div>
			<div className="relative group overflow-hidden row-[5/7] bg-lightDarkColor rounded-sm md:hidden lg:block lg:row-auto">
				<CategoryImage />
			</div>
			<div className="relative group overflow-hidden  bg-lightDarkColor rounded-sm md:hidden lg:block lg:row-auto">
				<CategoryImage />
			</div>
		</div>
	);
};

export default Category;

const CategoryImage = () => {
	return (
		<Image
			src={img}
			alt=""
			layout="fill"
			objectFit="cover"
			className="group-hover:scale-110 transition-all"
		/>
	);
};
