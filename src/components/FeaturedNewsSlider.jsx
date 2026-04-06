import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";

export default function FeaturedNewsSlider() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "news"),
            (snap) => {
                const data = snap.docs
                    .map((d) => ({
                        id: d.id,
                        ...d.data()
                    }))
                    .filter((n) => n.featured === true);

                setNews(data);
            }
        );

        return () => unsub();
    }, []);

    if (!news.length) return null;

    return (
        <div className="mt-4">
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={16}
                slidesPerView={3}
                breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {news.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link to={`/news/${item.id}`}>
                            <div className="group cursor-pointer">
                                <img
                                    src={item.image}
                                    className="w-full h-[160px] object-cover rounded-lg"
                                />

                                <h3 className="
          mt-2
          text-sm
          font-medium
          line-clamp-2
          group-hover:text-yellow-500
        ">
                                    {item.title}
                                </h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}