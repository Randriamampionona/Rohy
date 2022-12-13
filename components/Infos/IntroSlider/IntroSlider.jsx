import Image from "next/image";
import slide1 from "../../../public/assets/slider1.jpeg";
import slide2 from "../../../public/assets/slider2.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper";
import "swiper/css";

const IntroSlider = () => {
	return (
		<main className="">
			<Swiper
				slidesPerView={1}
				modules={[Pagination, Autoplay, EffectCoverflow]}
				pagination={{ clickable: true }}
				loop={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				effect="coverflow">
				{/* slide 1 */}
				<SwiperSlide>
					<div className="">
						<Image
							src={slide1}
							alt={slide1}
							style={{ objectFit: "cover" }}
						/>
					</div>
				</SwiperSlide>

				{/* slide 2 */}
				<SwiperSlide>
					<div className="">
						<Image
							src={slide2}
							alt={slide2}
							style={{ objectFit: "cover" }}
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</main>
	);
};

export default IntroSlider;
