import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const images = [
  "https://picsum.photos/id/1015/1200/700",
  "https://picsum.photos/id/1016/1200/700",
  "https://picsum.photos/id/1018/1200/700",
  "https://picsum.photos/id/1020/1200/700",
];

export default function Swipe() {
  return (
    <div className="w-[95vw] mx-auto p-4 mt-19">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        slidesPerView={1}
        autoplay={{ delay: 2000 }}
        pagination={{
          clickable: true,
        }}
        className="rounded-2xl overflow-hidden"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              className="w-full h-[300px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
